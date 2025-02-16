import axios from 'axios';
import Cookies from "js-cookie";

const createHeaders = () => {
  const authCookie = Cookies.get("Authorization");
  return authCookie ? {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${authCookie}`,
  } : { "Content-Type": "application/json" }
};

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1/user',
  withCredentials: true,  // 모든 요청에서 쿠키 자동 포함
  headers: createHeaders(),
});

export default apiClient;
