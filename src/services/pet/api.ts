import { apiClient } from '@/api/apiClient'
import {
  DeletePetRequest,
  GetAllPetResponse,
  GetDiaryResponse,
  GetPetResponse,
  PetRequestWithFormData,
  UpdatePetRequest
} from './types'

const PET_PREFIX = 'pet'

// 펫 정보 등록
export async function createPet({
  formData
}: PetRequestWithFormData): Promise<void> {
  const response = await apiClient.post(
    `/${PET_PREFIX}/createPetInfo`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )

  return response.data
}

// 유저의 모든 펫 정보 불러오기
export async function getAllPet(): Promise<GetAllPetResponse[]> {
  try {
    const response = await apiClient.get(`/${PET_PREFIX}/getPetsById`)

    console.log('📌 응답 데이터:', JSON.stringify(response.data, null, 2))

    return response.data.data
  } catch (error) {
    console.log('error : ' + error)
    throw new Error('펫 정보 가져오기 실패')
  }
}

// 펫 다이어리 등록
export async function createDiary({
  formData
}: PetRequestWithFormData): Promise<void> {
  const response = await apiClient.post(
    `/${PET_PREFIX}/createDiary`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
  return response.data
}

//  펫 petId가져오기
export async function getPet(petId: number): Promise<GetPetResponse> {
  try {
    const response = await apiClient.get(`/${PET_PREFIX}/getPetDetail/${petId}`)

    console.log('📌 응답 데이터:', JSON.stringify(response.data, null, 2))
    return response.data.data
  } catch (error) {
    console.log('error : ' + error)
    throw new Error('펫 상세정보 가져오기 실패')
  }
}

// 반려동물 수정
export async function updatePet({
  petId,
  formData
}: UpdatePetRequest): Promise<void> {
  const response = await apiClient.post(
    `/${PET_PREFIX}/updatePet/${petId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )

  return response.data
}

// 반려동물 삭제
export async function deletePet({ petId }: DeletePetRequest): Promise<void> {
  await apiClient.delete(`/${PET_PREFIX}/${petId}`)
}

// 다이어리 목록 가져오기
export async function getAllDiary(): Promise<GetDiaryResponse[]> {
  try {
    const response = await apiClient.get(`/${PET_PREFIX}/getDiaryById`, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data.data
  } catch (error) {
    console.log('error : ' + error)
    throw new Error('펫 정보 등록 실패')
  }
}

// diaryId로 다이어리 가져오기
export async function getDiary(diaryId: number): Promise<GetDiaryResponse> {
  try {
    const response = await apiClient.get(
      `/${PET_PREFIX}/getDiaryDetailById/${diaryId}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    console.log('다이어리 하나')
    console.log(response.data.data)
    return response.data.data
  } catch (error) {
    console.log('error : ' + error)
    throw new Error('펫 정보 등록 실패')
  }
}
