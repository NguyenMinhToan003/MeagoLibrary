export const CoreErrorCode = {
  VALIDATION: 'VALIDATION',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  RATE_LIMITED: 'RATE_LIMITED',
  UNAVAILABLE: 'UNAVAILABLE',
  INTERNAL: 'INTERNAL',
} as const;

export type CoreErrorCode = (typeof CoreErrorCode)[keyof typeof CoreErrorCode];

export interface CoreErrorOptions<TDetails = unknown> {
  code: CoreErrorCode | (string & {});
  message: string;
  details?: TDetails;
  cause?: unknown;
}

/** Transport-neutral error; an outer adapter maps it to HTTP or another protocol. */
export class CoreError<TDetails = unknown> extends Error {
  readonly code: CoreErrorCode | (string & {});
  readonly details?: TDetails;
  readonly cause?: unknown;

  constructor(options: CoreErrorOptions<TDetails>) {
    super(options.message);
    this.name = 'CoreError';
    this.code = options.code;
    this.details = options.details;
    this.cause = options.cause;
  }
}

export function isCoreError(error: unknown): error is CoreError {
  return error instanceof CoreError;
}
