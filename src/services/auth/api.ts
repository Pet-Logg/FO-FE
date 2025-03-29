import { apiClient } from '@/api/apiClient'
import { ChangePasswordRequest, LoginResponse, UserAuthRequest } from './types'

const USER_PREFIX = 'user'

// 회원가입
export async function signup({
  email,
  password
}: UserAuthRequest): Promise<void> {
  const response = await apiClient.post(`/${USER_PREFIX}/signup`, {
    email,
    password
  })

  return response.data
}

// 로그인
export async function login({
  email,
  password
}: UserAuthRequest): Promise<LoginResponse> {
  const response = await apiClient.post(`/${USER_PREFIX}/login`, {
    email,
    password
  })

  return response.data.data
}

// 비밀번호 변경
export async function changePassword({
  password
}: ChangePasswordRequest): Promise<void> {
  const response = await apiClient.post(
    `/${USER_PREFIX}/changePassword`,
    password
  )
  return response.data
}
