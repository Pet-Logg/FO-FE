import { UploadFile } from 'antd'

export interface PetRequestWithFormData {
  formData: FormData
}

export interface GetDiaryResponse {
  diaryId: number
  title: string
  content: string
  images?: UploadFile[]
  imgUrl?: string[]
  createdAt: string
}
