export type UserAuthRequest = {
  email: string
  password: string
}

export type ChangePasswordRequest = {
  password: string
}

export type LoginResponse = {
  accessToken: string
  refreshToken: string
}
