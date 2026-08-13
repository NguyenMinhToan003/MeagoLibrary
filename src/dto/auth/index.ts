/** Payload các endpoint /auth — dùng chung FE service và tài liệu API. */
export interface ILoginDto {
  email: string;
  password: string;
}

export interface IRegisterDto extends ILoginDto {
  displayName: string;
}

/** Response của login/refresh (refresh token nằm trong httpOnly cookie, không có ở body). */
export interface ITokenResponse {
  accessToken: string;
}

/** Payload bên trong access JWT (BE ký, FE không tự decode để authorize). */
export interface IJwtPayload {
  sub: string;
  email: string;
}
