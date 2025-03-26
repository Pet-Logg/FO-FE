import axios from 'axios'
import Cookies from 'js-cookie'

const petApiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1/pet',
  withCredentials: true
})

petApiClient.interceptors.request.use(
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

export default petApiClient
