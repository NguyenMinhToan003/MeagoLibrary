export type Result<T, E> =
  | Readonly<{ ok: true; value: T }>
  | Readonly<{ ok: false; error: E }>;

export function ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

export function err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

export function isOk<T, E>(result: Result<T, E>): result is Readonly<{ ok: true; value: T }> {
  return result.ok;
}

export function isErr<T, E>(result: Result<T, E>): result is Readonly<{ ok: false; error: E }> {
  return !result.ok;
}

export function unwrapResult<T, E>(result: Result<T, E>): T {
  if (result.ok) return result.value;
  throw result.error;
}

export function mapResult<T, U, E>(result: Result<T, E>, mapper: (value: T) => U): Result<U, E> {
  return result.ok ? ok(mapper(result.value)) : result;
}

