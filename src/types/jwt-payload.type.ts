export interface JwtPayload {
  id: string
  email: string
  nickname: string
}

export type UserWithRefreshToken = JwtPayload & {
  refreshToken: string
}
