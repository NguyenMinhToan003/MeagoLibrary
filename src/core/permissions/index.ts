export type PermissionCollection = ReadonlySet<string> | readonly string[];

export function hasAllPermissions(granted: PermissionCollection, required: readonly string[]): boolean {
  if (required.length === 0) return true;
  const values: ReadonlySet<string> = granted instanceof Set ? granted : new Set(granted);
  return required.every((permission) => values.has(permission));
}

export function hasAnyPermission(granted: PermissionCollection, required: readonly string[]): boolean {
  if (required.length === 0) return true;
  const values: ReadonlySet<string> = granted instanceof Set ? granted : new Set(granted);
  return required.some((permission) => values.has(permission));
}

