import { HttpHeader } from '@/constants'
import { ErrorResultResponse } from '@/types/ErrorResponse'
import { getUserId, getUserRole } from '@/utils/getUserInfo'
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

export const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1`,
  withCredentials: true
})

apiClient.interceptors.request.use(
  (config) => {
    const authCookie = Cookies.get(HttpHeader.AUTHORIZATION) // 쿠키에서 토큰 가져오기

    if (authCookie) {
      config.headers[HttpHeader.AUTHORIZATION] = `Bearer ${authCookie}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 에러 핸들링: 401이면 accessToken 재발급 후 재요청
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // 조건: 401 + 한 번만 재시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const userId = getUserId()
        const role = getUserRole()
        // Refresh 토큰으로 Access 토큰 재발급 요청
        await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/api/v1/user/refresh`,
          { userId, role },
          {
            withCredentials: true
          }
        )

        // 재발급 성공 → 실패했던 요청 다시 실행
        return apiClient(originalRequest)
      } catch (refreshErr) {
        const refreshError = refreshErr as AxiosError<ErrorResultResponse>
        const message = refreshError.response?.data?.resultMessage
        if (message === '만료된 JWT 토큰입니다.') {
          window.location.href = '/login'
        }
        if (message?.startsWith('Refresh')) {
          window.location.href = '/login'
        }
      }

      return Promise.reject(error)
    }
  }
)
