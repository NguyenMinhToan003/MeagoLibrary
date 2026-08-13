/** URL compose từ constant — cả FE lẫn tài liệu API dùng chung một nguồn. */
export const API_VERSION = '/api/v1';

export const API_CONTROLLERS = {
  AUTH: 'auth',
  USERS: 'users',
  ROLES: 'roles',
  STORIES: 'stories',
} as const;

export const API_ACTIONS = {
  LOGIN: 'login',
  REGISTER: 'register',
  REFRESH: 'refresh',
  LOGOUT: 'logout',
  LOGOUT_ALL: 'logout-all',
  ME: 'me',
} as const;

/**
 * Permission string "resource:action" — nguồn chân lý duy nhất,
 * BE dùng trong @RequirePermissions, FE dùng trong PermissionGuard/usePermission,
 * seed script dùng để tạo bảng permissions.
 */
export const PERMISSIONS = {
  USER: {
    READ: 'user:read',
    MANAGE: 'user:manage',
  },
  ROLE: {
    READ: 'role:read',
    MANAGE: 'role:manage',
  },
  STORY: {
    CREATE: 'story:create',
    READ: 'story:read',
    MANAGE: 'story:manage',
  },
} as const;
