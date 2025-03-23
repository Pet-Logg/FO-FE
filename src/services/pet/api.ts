import petApiClient from '@/api/petApiClient'
import { GetPetDetailByIdResponse, PetRequestWithFormData } from './types'

// 펫 정보 등록
export async function createPet({
  formData
}: PetRequestWithFormData): Promise<void> {
  const response = await petApiClient.post('/createPetInfo', formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data
}

// 펫 다이어리 등록
export async function createDiary({
  formData
}: PetRequestWithFormData): Promise<void> {
  const response = await petApiClient.post('/createDiary', formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

//  반려동물 정보 가져오기
export async function getPetDetailById(
  petId: number
): Promise<GetPetDetailByIdResponse> {
  try {
    const response = await petApiClient.get(`/getPetDetail/${petId}`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    console.log('📌 응답 데이터:', JSON.stringify(response.data, null, 2))
    return response.data.data
  } catch (error) {
    console.log('error : ' + error)
    throw new Error('펫 상세정보 가져오기 실패')
  }
}
