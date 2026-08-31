export interface ILoginDto {
  email: string;
  password: string;
}

export interface IRegisterDto extends ILoginDto {
  displayName: string;
}

export interface ITokenResponse {
  accessToken: string;
  expiresIn?: number;
}

/** Minimal interoperable access JWT payload. */
export interface IJwtPayload {
  sub: string;
  sid: string;
  jti: string;
  iss: string;
  aud: string | string[];
  iat: number;
  exp: number;
  email?: string;
}
