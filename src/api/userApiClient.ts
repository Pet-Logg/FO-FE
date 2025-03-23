import axios from 'axios';
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1/user',
  withCredentials: true,  // 모든 요청에서 쿠키 자동 포함
});

apiClient.interceptors.request.use((config) => {
  const authCookie = Cookies.get("Authorization"); // 쿠키에서 토큰 가져오기

  if (authCookie) {
    config.headers["Authorization"] = `Bearer ${authCookie}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});


export default apiClient;