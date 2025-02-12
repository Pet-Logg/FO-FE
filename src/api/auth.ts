import axios from 'axios';

// 백엔드 기본 URL
const API_BASE_URL = 'http://localhost:8080/api/auth';

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export interface signupResponse {
  id: number;
  username: string;
  email: string;
};

export async function loginUser(
  email: string,
  password: string,
): Promise<LoginResponse> {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    // throw new Error(error.response?.data?.message || "로그인 실패");
    throw new Error("로그인 실패");

  }
};

export async function signupUser(
  username: string,
  email: string,
  password: string
): Promise<signupResponse> {
  
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, {username, email, password})
    return response.data;
  } catch(error) {
    // throw new Error(errer.response?.data?.message || "회원가입 실패");
    throw new Error( "회원가입 실패");
  }
  
}