import { apiClient } from '@/api/apiClient'
import { HttpContentType, HttpHeader } from '@/constants'
import { GetDiaryResponse, PetRequestWithFormData } from './types'

const PET_PREFIX = 'pet'

// 펫 다이어리 등록
export async function createDiary({
  formData
}: PetRequestWithFormData): Promise<void> {
  const response = await apiClient.post(
    `/${PET_PREFIX}/createDiary`,
    formData,
    {
      headers: {
        [HttpHeader.CONTENT_TYPE]: HttpContentType.FORM_DATA
      }
    }
  )
  return response.data
}

// 다이어리 목록 가져오기
export async function getAllDiary(): Promise<GetDiaryResponse[]> {
  try {
    const response = await apiClient.get(`/${PET_PREFIX}/getDiaryById`)
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
          [HttpHeader.CONTENT_TYPE]: HttpContentType.FORM_DATA
        }
      }
    )
    return response.data.data
  } catch (error) {
    console.log('error : ' + error)
    throw new Error('펫 정보 등록 실패')
  }
}
