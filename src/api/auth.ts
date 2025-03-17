import { UploadFile } from "antd";
import { DiaryData } from "../types/DiaryData";
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

export interface Pet {
  petId: number;
  petImg: string;
  petName: string;
}
export type GetPetsByIdResponse = Pet[];

export interface GetPetDetailByIdResponse {
  petId: number | null;
  petImg: string;
  animal: string;
  petName: string;
  petBirth: string;
  petBreed: string;
  petGender: string;
  petWeight: number;

  isNeutered?: string | null;
  concernedDiseases?: string | null;
  allergies?: string | null;
}

export interface CreateDiaryResponse {
  title: string;
  content: string;
  images?: UploadFile[];
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
    console.log("formData 은 과연" + formData.get("petImg"));
    return response.data;
  } catch (error) {
    console.log("error : " + error)
    throw new Error("펫 정보 등록 실패");
  }
};

// 유저의 모든 펫 정보 불러오기
export async function getPetsById(): Promise<GetPetsByIdResponse> {
  try {
    const response = await petApiClient.get("/getPetsById",{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    console.log("📌 응답 데이터:", JSON.stringify(response.data, null, 2));

    return response.data.data;
  } catch (error) {
    console.log("error : " + error);
    throw new Error("펫 정보 가져오기 실패");
  }
};

//  반려동물 정보 가져오기
export async function getPetDetailById(petId: number): Promise<GetPetDetailByIdResponse>{
  try {
    const response = await petApiClient.get(`/getPetDetail/${petId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    console.log("📌 응답 데이터:", JSON.stringify(response.data, null, 2));
    return response.data.data;
  } catch(error) {
    console.log("error : " + error);
    throw new Error("펫 상세정보 가져오기 실패");
  }
}

// 반려동물 삭제
export async function deletePet(petId: number): Promise<void> {
  try {
    await petApiClient.delete(`/${petId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("error : " + error);
    throw new Error("펫 삭제 실패");
  }
}

// 반려동물 수정
export async function updatePet(petId: number, formData:FormData): Promise<GetPetDetailByIdResponse> {
  try {
    const response = await petApiClient.post(`updatePet/${petId}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;

  } catch (error) {
    console.log("error : " + error);
    throw new Error("펫 수정 실패");
  }
}

// 다이어리 등록
export async function createDiary (formData: FormData): Promise<CreateDiaryResponse> {
  try {
    const response = await petApiClient.post("/createDiary", formData, {
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

// 다이어리 목록 가져오기  
export async function getDiaryById (): Promise<DiaryData[]> {
  try {
    console.log("durl");
    const response = await petApiClient.get("/getDiaryById", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("error : " + error)
    throw new Error("펫 정보 등록 실패");
  }
};