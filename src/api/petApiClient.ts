import axios from 'axios';
import Cookies from "js-cookie";

const createHeaders = () => {
  const authCookie = Cookies.get("Authorization"); // 쿠키에서 토큰 가져오기
  return authCookie ? {
    "Content-Type": "application/json",
    Authorization: `Bearer ${authCookie}`,
  } : { "Content-Type": "application/json" }
};

const petApiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1/pet',  // ✅ Pet API base URL
  withCredentials: true,  // 모든 요청에서 쿠키 자동 포함
  headers: createHeaders(),
});

export default petApiClient;
