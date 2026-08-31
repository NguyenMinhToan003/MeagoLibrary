export interface Clock { now(): Date }
export interface IdGenerator { generate(): string }
export interface Hasher {
  hash(value: string): Promise<string> | string;
  verify?(value: string, hash: string): Promise<boolean> | boolean;
}
export interface TransactionRunner<TContext = unknown> {
  run<T>(work: (context: TContext) => Promise<T>): Promise<T>;
}

export const systemClock: Clock = { now: () => new Date() };

