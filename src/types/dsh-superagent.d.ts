declare module 'dsh-superagent' {
  export const name: string;
  export const inject: string[];
  export const Config: (input?: Record<string, unknown>) => {
    stateDir: string;
    promptMaxChars?: number;
    admissionContextMaxPages?: number;
    admissionContextTimeoutMs?: number;
  };
  export function apply(ctx: unknown, config?: unknown): void;
}

declare module 'dsh-superagent/github-watch' {
  export const name: string;
  export const inject: string[];
  export function apply(ctx: unknown): void;
}

declare module 'dsh-superagent/feishu-watch' {
  export const name: string;
  export const inject: string[];
  export function apply(ctx: unknown): void;
}
