import axios from 'axios';
import Cookies from "js-cookie";

const productApiClient = axios.create({
  baseURL: 'http://localhost:8080/api/v1/product',
  withCredentials: true,
});

productApiClient.interceptors.request.use((config) => {
  const authCookie = Cookies.get("Authorization"); // 쿠키에서 토큰 가져오기

  console.log("Authorization 쿠키 값: ", authCookie);

  if (authCookie) {
    config.headers["Authorization"] = `Bearer ${authCookie}`;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});


export default productApiClient;
