import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

export interface SshCredentialInput {
  sessionId: string;
  host: string;
  username: string;
  password: string;
}

export interface EncryptedEnvelope {
  v: 1;
  alg: 'AES-256-GCM';
  kdf: 'scrypt';
  salt: string;
  iv: string;
  tag: string;
  data: string;
  updatedAt: number;
}

interface VaultFileStructure {
  header: 'DSH_SSH_VAULT_V1';
  records: Record<string, EncryptedEnvelope>;
}

const RUNTIME_EPHEMERAL_PEPPER = crypto.randomBytes(32);

function getVaultMasterSecret(): Buffer {
  const machineIdParts = [
    os.hostname(),
    os.platform(),
    os.arch(),
    process.cwd(),
    process.env.DSH_SSH_VAULT_SECRET || 'dsh-ssh-zero-plaintext-vault-key-v1',
  ].join('|');
  return crypto
    .createHmac('sha256', RUNTIME_EPHEMERAL_PEPPER)
    .update(machineIdParts)
    .digest();
}

export function encryptCredentialPayload(
  payload: SshCredentialInput,
  customSecret?: Buffer,
): EncryptedEnvelope {
  const secret = customSecret ?? getVaultMasterSecret();
  const salt = crypto.randomBytes(16);
  const iv = crypto.randomBytes(12);
  const key = crypto.scryptSync(secret, salt, 32, { N: 16384, r: 8, p: 1 });

  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const aad = Buffer.from(`dsh-ssh-session:${payload.sessionId}`, 'utf8');
  cipher.setAAD(aad);

  const plaintext = Buffer.from(
    JSON.stringify({
      host: payload.host,
      username: payload.username,
      password: payload.password,
    }),
    'utf8',
  );

  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    v: 1,
    alg: 'AES-256-GCM',
    kdf: 'scrypt',
    salt: salt.toString('base64'),
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
    data: encrypted.toString('base64'),
    updatedAt: Date.now(),
  };
}

export function decryptCredentialPayload(
  sessionId: string,
  envelope: EncryptedEnvelope,
  customSecret?: Buffer,
): SshCredentialInput {
  const secret = customSecret ?? getVaultMasterSecret();
  const salt = Buffer.from(envelope.salt, 'base64');
  const iv = Buffer.from(envelope.iv, 'base64');
  const tag = Buffer.from(envelope.tag, 'base64');
  const ciphertext = Buffer.from(envelope.data, 'base64');

  const key = crypto.scryptSync(secret, salt, 32, { N: 16384, r: 8, p: 1 });
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
  const aad = Buffer.from(`dsh-ssh-session:${sessionId}`, 'utf8');
  decipher.setAAD(aad);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  const parsed = JSON.parse(decrypted.toString('utf8')) as {
    host: string;
    username: string;
    password: string;
  };

  return {
    sessionId,
    host: parsed.host,
    username: parsed.username,
    password: parsed.password,
  };
}

export class SshCredentialVault {
  private readonly vaultFilePath: string;
  private readonly secret: Buffer;

  constructor(vaultDir = path.resolve(process.cwd(), 'ssh'), customSecret?: Buffer) {
    fs.mkdirSync(vaultDir, { recursive: true });
    this.vaultFilePath = path.join(vaultDir, '.vault.enc');
    this.secret = customSecret ?? getVaultMasterSecret();
  }

  public getVaultPath(): string {
    return this.vaultFilePath;
  }

  private readStore(): VaultFileStructure {
    if (!fs.existsSync(this.vaultFilePath)) {
      return { header: 'DSH_SSH_VAULT_V1', records: {} };
    }
    try {
      const raw = fs.readFileSync(this.vaultFilePath, 'utf8');
      const decoded = Buffer.from(raw, 'base64').toString('utf8');
      const parsed = JSON.parse(decoded) as VaultFileStructure;
      if (parsed && parsed.header === 'DSH_SSH_VAULT_V1' && parsed.records) {
        return parsed;
      }
    } catch {
      // Reset corrupted vault
    }
    return { header: 'DSH_SSH_VAULT_V1', records: {} };
  }

  private writeStore(store: VaultFileStructure): void {
    const serialized = Buffer.from(JSON.stringify(store), 'utf8').toString('base64');
    fs.writeFileSync(this.vaultFilePath, serialized, { encoding: 'utf8', mode: 0o600 });
  }

  private hashSessionKey(sessionId: string): string {
    return crypto.createHmac('sha256', this.secret).update(`session:${sessionId}`).digest('hex');
  }

  public saveCredentials(input: SshCredentialInput): void {
    const store = this.readStore();
    const keyHash = this.hashSessionKey(input.sessionId);
    store.records[keyHash] = encryptCredentialPayload(input, this.secret);
    this.writeStore(store);
  }

  public loadCredentials(sessionId: string): SshCredentialInput | null {
    const store = this.readStore();
    const keyHash = this.hashSessionKey(sessionId);
    const envelope = store.records[keyHash];
    if (!envelope) return null;
    try {
      return decryptCredentialPayload(sessionId, envelope, this.secret);
    } catch {
      return null;
    }
  }

  public removeCredentials(sessionId: string): void {
    const store = this.readStore();
    const keyHash = this.hashSessionKey(sessionId);
    if (keyHash in store.records) {
      delete store.records[keyHash];
      this.writeStore(store);
    }
  }
}
