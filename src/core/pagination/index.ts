import type { IPaginatedResult } from '../../interfaces/common';

export interface PaginationInput { page?: number; limit?: number }
export interface PaginationPolicy { defaultPage?: number; defaultLimit?: number; maxLimit?: number }
export interface NormalizedPagination { page: number; limit: number }

export function normalizePagination(
  input: PaginationInput,
  policy: PaginationPolicy = {},
): NormalizedPagination {
  const defaultPage = positiveInteger(policy.defaultPage, 1);
  const defaultLimit = positiveInteger(policy.defaultLimit, 20);
  const maxLimit = positiveInteger(policy.maxLimit, 100);
  return {
    page: positiveInteger(input.page, defaultPage),
    limit: Math.min(positiveInteger(input.limit, defaultLimit), maxLimit),
  };
}

export function getPaginationOffset(pagination: NormalizedPagination): number {
  return (pagination.page - 1) * pagination.limit;
}

export function createPaginatedResult<T>(
  items: T[],
  totalItems: number,
  pagination: NormalizedPagination,
): IPaginatedResult<T> {
  const safeTotal = Math.max(0, Math.trunc(totalItems));
  const totalPages = safeTotal === 0 ? 0 : Math.ceil(safeTotal / pagination.limit);
  return {
    items,
    totalItems: safeTotal,
    page: pagination.page,
    limit: pagination.limit,
    totalPages,
    hasNextPage: pagination.page < totalPages,
    hasPreviousPage: pagination.page > 1 && totalPages > 0,
  };
}

function positiveInteger(value: number | undefined, fallback: number): number {
  return typeof value === 'number' && Number.isFinite(value) && value > 0
    ? Math.trunc(value)
    : fallback;
}

