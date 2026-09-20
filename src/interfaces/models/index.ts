import { EAuditActorType, EAuditOutcome, EUserStatus } from '../../enums';
import { IBaseModel } from '../common';

/** User trả về  từ GET /auth/me — kèm tập permission đã resolve. */
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

/**
 * 1 dòng lịch sử thao tác — append-only, không có updatedAt/version.
 * Khớp AuditEventEntity của MeagoServer (audit-event.entity.ts).
 */
export interface IAuditEvent {
  id: string;
  occurredAt: string;
  actorType: EAuditActorType | string;
  actorId: string | null;
  action: string;
  resourceType: string | null;
  resourceId: string | null;
  outcome: EAuditOutcome | string;
  reasonCode: string | null;
  requestId: string | null;
  traceId: string | null;
  httpMethod: string | null;
  routeTemplate: string | null;
  statusCode: number | null;
  ip: string | null;
  userAgent: string | null;
  durationMs: number | null;
  metadata: Record<string, unknown> | null;
}

/** Query params cho GET /audit-events — khớp AuditEventQueryDto của MeagoServer. */
export interface IAuditEventQuery {
  actorId?: string;
  action?: string;
  resourceType?: string;
  resourceId?: string;
  outcome?: EAuditOutcome | string;
  from?: string;
  to?: string;
  cursor?: string;
  limit?: number;
}
