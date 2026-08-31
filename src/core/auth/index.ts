export const AuthMode = { JWT: 'jwt', SESSION: 'session' } as const;
export type AuthMode = (typeof AuthMode)[keyof typeof AuthMode];

export interface AuthPrincipal<TAttributes extends Record<string, unknown> = Record<string, unknown>> {
  subjectId: string;
  sessionId: string;
  email?: string;
  permissions?: readonly string[];
  attributes?: Readonly<TAttributes>;
}

export interface AuthIdentity<TAttributes extends Record<string, unknown> = Record<string, unknown>> {
  subjectId: string;
  email?: string;
  attributes?: Readonly<TAttributes>;
}

export interface AuthContext {
  ip?: string;
  userAgent?: string;
  deviceId?: string;
  deviceName?: string;
}

export type AuthCredential =
  | Readonly<{ kind: 'bearer'; token: string }>
  | Readonly<{ kind: 'refresh'; token: string }>
  | Readonly<{ kind: 'session'; sessionId: string }>;

export type AuthResult =
  | Readonly<{ mode: 'jwt'; principal: AuthPrincipal; accessToken: string; accessExpiresAt: Date; refreshToken?: string; refreshExpiresAt?: Date }>
  | Readonly<{ mode: 'session'; principal: AuthPrincipal; sessionId: string; expiresAt: Date }>;

export interface AuthStrategy {
  signIn(identity: AuthIdentity, context: AuthContext): Promise<AuthResult>;
  authenticate(credential: AuthCredential, context: AuthContext): Promise<AuthPrincipal | null>;
  renew(credential: AuthCredential, context: AuthContext): Promise<AuthResult>;
  signOut(credential: AuthCredential, context: AuthContext): Promise<void>;
  revokeAll(subjectId: string): Promise<void>;
}

export interface SessionRecord<TData extends Record<string, unknown> = Record<string, unknown>> {
  id: string;
  subjectId: string;
  createdAt: Date;
  expiresAt: Date;
  absoluteExpiresAt: Date;
  lastSeenAt: Date;
  revokedAt: Date | null;
  context?: AuthContext;
  data?: Readonly<TData>;
}

export interface SessionStore<TData extends Record<string, unknown> = Record<string, unknown>> {
  create(session: SessionRecord<TData>): Promise<void>;
  findById(id: string): Promise<SessionRecord<TData> | null>;
  touch(id: string, lastSeenAt: Date, expiresAt: Date): Promise<boolean>;
  rotate(currentId: string, successor: SessionRecord<TData>): Promise<boolean>;
  revoke(id: string, revokedAt: Date): Promise<void>;
  revokeAll(subjectId: string, revokedAt: Date): Promise<void>;
}

