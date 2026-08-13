import { EUserStatus } from '../../enums';
import { IBaseModel } from '../common';

/** User trả về từ GET /auth/me — kèm tập permission đã resolve. */
export interface ICurrentUser {
  id: string;
  email: string;
  displayName: string;
  status: EUserStatus | string;
  permissions: string[];
}

export interface IUser extends IBaseModel {
  email: string;
  displayName: string;
  status: EUserStatus | string;
}

export interface IPermission extends IBaseModel {
  name: string;
  description?: string | null;
}

export interface IRole extends IBaseModel {
  name: string;
  description?: string | null;
  permissions: IPermission[];
}
