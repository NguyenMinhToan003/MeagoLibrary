# Changelog

## Unreleased

- Added `PERMISSIONS.AUDIT.READ` and `API_CONTROLLERS.AUDIT_EVENTS` for the audit trail history page.

## 0.3.0

- Added `ICursorPaginatedResult<T>` for cursor-based lists (audit trail and future append-only tables).
- Added `IAuditEvent` and `IAuditEventQuery` contracts matching MeagoServer's audit trail module.
- Added `EAuditOutcome` and `EAuditActorType` enums.

## 0.2.0

- Added framework-neutral result, error, response, pagination and permission primitives.
- Added authentication contracts for JWT and stateful session modes.
- Added clock, ID, hashing and transaction ports.
- Added package exports and release verification.
- Extended the JWT contract with session identity and verification claims.

## 0.1.0

- Initial shared DTO, interface, enum, permission and API constants.

