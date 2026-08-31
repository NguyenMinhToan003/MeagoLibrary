import type { ESortDir } from '../../enums';

export interface IBaseResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}


export interface IErrorResponse<TDetails = unknown> {
  statusCode: number;
  error: string;
  message: string | string[];
  path: string;
  timestamp: string;
  code?: string;
  details?: TDetails;
}

export interface IPaginatedResult<T> {
  items: T[];
  totalItems: number;
  page: number;
  limit: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export interface IBaseQuery<TSortBy extends string = string> {
  page?: number;
  limit?: number;
  sortBy?: TSortBy;
  sortDir?: ESortDir | 'ASC' | 'DESC';
  search?: string;
}

export interface IBaseModel {
  id: string;
  version: number;
  createdAt: string;
  updatedAt: string | null;
}

export interface ITrackingModel extends IBaseModel {
  createdBy: string | null;
  updatedBy: string | null;
}
