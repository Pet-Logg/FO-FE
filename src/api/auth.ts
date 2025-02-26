import apiClient from "./apiClient";
import petApiClient from "./petApiClient";

// 백엔드 기본 URL
const API_BASE_URL = 'http://localhost:8080/api/v1/user';

export interface signupResponse {
  id: number;
  username: string;
  email: string;
};

export interface LoginResponse {
  [x: string]: string;
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

export interface CreatePetInfoResponse {
  id: number;
}


// 회원가입
export async function signupUser(
  email: string,
  password: string
): Promise<signupResponse> {
  
  try {
    const response = await apiClient.post("/signup", { email, password }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch(error) {
    // throw new Error(errer.response?.data?.message || "회원가입 실패");
    throw new Error( "회원가입 실패");
  }
  
};

// 로그인
export async function loginUser(
  email: string,
  password: string,
): Promise<LoginResponse> {
  try {
    const response = await apiClient.post("/login", { email, password }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    // throw new Error(error.response?.data?.message || "로그인 실패");
    throw new Error("로그인 실패");

  }
};

// 펫 정보 등록
export async function createPetInfo (formData: FormData): Promise<CreatePetInfoResponse> {
  try {
    const response = await petApiClient.post("/createPetInfo", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log("error : " + error)
    throw new Error("펫 정보 등록 실패");
  }
};

