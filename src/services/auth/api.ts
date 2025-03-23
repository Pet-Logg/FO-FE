import apiClient from "@/api/userApiClient";
import { UserAuthRequest, ChangePasswordRequest } from "./types";

// 회원가입
export async function signup({ email, password }: UserAuthRequest): Promise<void> {

    const response = await apiClient.post("/signup", { email, password }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return response.data;
  
};

// 로그인
export async function login({ email, password }: UserAuthRequest): Promise<void> {
    const response = await apiClient.post("/login", { email, password }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return response.data.data;
};

// 비밀번호 변경
export async function changePassword({ password }: ChangePasswordRequest): Promise<void> {
    const response = await apiClient.post(`/changePassword`, password , {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
};