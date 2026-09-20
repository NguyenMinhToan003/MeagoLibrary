/** Trạng thái user — mirror EUserStatus của MeagoServer (user.entity.ts) */
export enum EUserStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}

export enum ESortDir {
  ASC = 'ASC',
  DESC = 'DESC',
}

/** Kết quả 1 audit event — mirror AuditOutcome của MeagoServer (audit.types.ts) */
export enum EAuditOutcome {
  SUCCESS = 'success',
  FAILURE = 'failure',
  DENIED = 'denied',
}

/** Loại actor thực hiện hành động — mirror AuditActorType của MeagoServer (audit.types.ts) */
export enum EAuditActorType {
  USER = 'user',
  SYSTEM = 'system',
  SERVICE = 'service',
  ANONYMOUS = 'anonymous',
}
