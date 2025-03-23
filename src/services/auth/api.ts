import apiClient from "@/api/userApiClient";
import { SignUpRequest } from "./types";

// 회원가입
export async function signupUser({ email, password }: SignUpRequest): Promise<void> {

    const response = await apiClient.post("/signup", { email, password }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    return response.data;
  
};