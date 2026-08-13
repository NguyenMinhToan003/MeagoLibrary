import { ESortDir } from '../../enums';

/** Envelope response chuẩn — BE TransformInterceptor tạo ra, FE unwrap. */
export interface IBaseResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
}

/** Shape lỗi chuẩn — BE HttpExceptionFilter/TypeOrmExceptionFilter tạo ra. */
export interface IErrorResponse {
  statusCode: number;
  error: string;
  message: string | string[];
  path: string;
  timestamp: string;
}

/** Kết quả danh sách phân trang — BE BaseService.findMulti trả về. */
export interface IPaginatedResult<T> {
  items: T[];
  totalItems: number;
  page: number;
  limit: number;
}

/** Query chuẩn cho endpoint danh sách — mirror BaseQueryDto của BE. */
export interface IBaseQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDir?: ESortDir | 'ASC' | 'DESC';
  search?: string;
}

/** Field chung mọi entity — mirror BaseEntity của BE. */
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
