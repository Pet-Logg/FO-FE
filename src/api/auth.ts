import { UploadFile } from "antd";
import { DiaryData } from "../types/DiaryData";
import petApiClient from "./petApiClient";
import { ProductData } from "../types/ProductData";
import productApiClient from "./productApiClient";

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

// 다이어리 목록 가져오기  
export async function getDiaryById (): Promise<DiaryData[]> {
  try {
    const response = await petApiClient.get("/getDiaryById", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.data;
  } catch (error) {
    console.log("error : " + error);
    throw new Error("펫 정보 등록 실패");
  }
};

// diaryId로 다이어리 가져오기
export async function getDiaryDetailById (diaryId: number): Promise<DiaryData[]> {
  try {
    const response = await petApiClient.get(`/getDiaryDetailById/${diaryId}`, {
      withCredentials: true,
      headers: {
         "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log("error : " + error);
    throw new Error("펫 정보 등록 실패");
  }
};



// 상품 등록
export async function createProduct(formData: FormData): Promise<void> {
  try {
    const response = await productApiClient.post("", formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("상품 등록 오류:", error);
    throw new Error("상품 등록 실패");
  }
}

// 상품 전체 조회
export async function getProducts(): Promise<ProductData[]> {
  try {
    const response = await productApiClient.get("/products", {
      withCredentials: true,
    });
    return response.data.data;
    
  } catch (error) {
    console.error("상품 목록 가져오기 실패:", error);
    throw new Error("상품 목록을 불러올 수 없습니다.");
  }
}

// productId로 상품 하나 조회
export async function getProductById(productId: number): Promise<ProductData> {
  try {
    const response = await productApiClient.get(`/${productId}`, {
      withCredentials: true,
    });
    return response.data.data;
    
  } catch (error) {
    console.error("상품 상세 조회 실패:", error);
    throw error;
  }
}

// 상품 삭제
export async function deleteProduct(productId: number): Promise<void> {
  try {
    await productApiClient.delete(`/${productId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("상품 삭제 실패:", error);
    throw error;
  }
}

// 상품 수정
export async function updateProduct(productId: number, formData: FormData): Promise<void> {
  try {
    await productApiClient.put(`/${productId}`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("상품 삭제 실패:", error);
    throw error;
  }
}