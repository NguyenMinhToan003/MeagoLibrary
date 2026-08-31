import type { IBaseResponse, IErrorResponse } from '../../interfaces/common';

export interface ResponseMeta {
  statusCode?: number;
  message?: string;
  timestamp?: string;
}

export function createSuccessResponse<T>(data: T, meta: ResponseMeta = {}): IBaseResponse<T> {
  return {
    statusCode: meta.statusCode ?? 200,
    message: meta.message ?? 'Success',
    data,
    timestamp: meta.timestamp ?? new Date().toISOString(),
  };
}

export interface ErrorResponseInput<TDetails = unknown> extends Omit<ResponseMeta, 'message'> {
  error: string;
  message: string | string[];
  path: string;
  code?: string;
  details?: TDetails;
}

export function createErrorResponse<TDetails = unknown>(
  input: ErrorResponseInput<TDetails>,
): IErrorResponse<TDetails> {
  return {
    statusCode: input.statusCode ?? 500,
    error: input.error,
    message: input.message,
    path: input.path,
    timestamp: input.timestamp ?? new Date().toISOString(),
    ...(input.code === undefined ? {} : { code: input.code }),
    ...(input.details === undefined ? {} : { details: input.details }),
  };
}

export function joinApiPath(...parts: ReadonlyArray<string | number | null | undefined>): string {
  const values = parts.filter((part): part is string | number => part !== null && part !== undefined);
  if (values.length === 0) return '';
  return values
    .map((part, index) => {
      const value = String(part);
      return index === 0 ? value.replace(/\/+$/g, '') : value.replace(/^\/+|\/+$/g, '');
    })
    .filter(Boolean)
    .join('/');
}
