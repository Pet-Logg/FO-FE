import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true
})

apiClient.interceptors.request.use(
  (config) => {
    const authCookie = Cookies.get('Authorization') // 쿠키에서 토큰 가져오기

    if (authCookie) {
      config.headers['Authorization'] = `Bearer ${authCookie}`
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
        // Refresh 토큰으로 Access 토큰 재발급 요청
        await axios.post('http://localhost:8080/api/v1/user/refresh', null, {
          withCredentials: true
        })

        // 재발급 성공 → 실패했던 요청 다시 실행
        return apiClient(originalRequest)
      } catch (refreshErr) {
        const refreshError = refreshErr as AxiosError

        const message = refreshError.response?.data?.resultMessage

        if (message === '만료된 JWT 토큰입니다.') {
          window.location.href = '/login'
        }
      }

      return Promise.reject(error)
    }
  }
)
