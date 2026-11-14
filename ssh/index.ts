import http from 'node:http';
import { SshCredentialVault, encryptCredentialPayload, decryptCredentialPayload } from './crypto-vault.ts';
import { SshSessionManager, computeTabBadgeState, formatHeroConnectedText } from './ssh-manager.ts';
import { SSH_CLIENT_CSS_APPEND, SSH_CLIENT_RUNTIME_COMPONENTS } from './client-ui.ts';

export {
  SshCredentialVault,
  encryptCredentialPayload,
  decryptCredentialPayload,
  SshSessionManager,
  computeTabBadgeState,
  formatHeroConnectedText,
  SSH_CLIENT_CSS_APPEND,
  SSH_CLIENT_RUNTIME_COMPONENTS,
};

const defaultSshManager = new SshSessionManager();

export function getGlobalSshManager(): SshSessionManager {
  return defaultSshManager;
}

function readJsonBody(req: http.IncomingMessage): Promise<Record<string, unknown>> {
  return new Promise((resolve) => {
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? (JSON.parse(raw) as Record<string, unknown>) : {});
      } catch {
        resolve({});
      }
    });
    req.on('error', () => resolve({}));
  });
}

function sendJson(res: http.ServerResponse, statusCode: number, payload: unknown): void {
  res.writeHead(statusCode, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
  });
  res.end(JSON.stringify(payload));
}

export async function handleSshApiRequest(
  req: http.IncomingMessage,
  res: http.ServerResponse,
): Promise<boolean> {
  const rawUrl = req.url || '/';
  if (!rawUrl.startsWith('/api/ssh')) {
    return false;
  }

  const parsedUrl = new URL(rawUrl, 'http://127.0.0.1');

  if (req.method === 'POST' && parsedUrl.pathname === '/api/ssh/connect') {
    const body = await readJsonBody(req);
    const sessionId = String(body.sessionId || '').trim();
    const host = String(body.host || '').trim();
    const username = String(body.username || '').trim();
    const password = String(body.password || '');

    if (!sessionId) {
      sendJson(res, 400, { ok: false, error: 'Missing sessionId' });
      return true;
    }

    const result = await defaultSshManager.connectSession({
      sessionId,
      host,
      username,
      password,
    });
    sendJson(res, 200, result);
    return true;
  }

  if (req.method === 'POST' && parsedUrl.pathname === '/api/ssh/disconnect') {
    const body = await readJsonBody(req);
    const sessionId = String(body.sessionId || '').trim();
    if (sessionId) {
      defaultSshManager.disconnectSession(sessionId);
    }
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (req.method === 'GET' && parsedUrl.pathname === '/api/ssh/status') {
    const sessionId = parsedUrl.searchParams.get('sessionId') || '';
    if (sessionId) {
      const state = defaultSshManager.getSessionState(sessionId, true);
      sendJson(res, 200, { ok: true, state });
      return true;
    }
    const sessions = defaultSshManager.getAllSessionsState(true);
    sendJson(res, 200, { ok: true, sessions });
    return true;
  }

  sendJson(res, 404, { ok: false, error: 'Not found' });
  return true;
}
