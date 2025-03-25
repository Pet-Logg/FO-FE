import { UploadFile } from 'antd'

export interface PetRequestWithFormData {
  formData: FormData
}

export interface GetPetResponse {
  petId: number | null
  petImg: string
  animal: string
  petName: string
  petBirth: string
  petBreed: string
  petGender: string
  petWeight: number

  isNeutered?: string | null
  concernedDiseases?: string | null
  allergies?: string | null
}

export interface UpdatePetRequest {
  petId: number
  formData: FormData
}

export interface DeletePetRequest {
  petId: number
}

export interface GetDiaryResponse {
  diaryId: number
  title: string
  content: string
  images?: UploadFile[]
  imgUrl?: string[]
  createdAt: string
}

export interface GetDiaryRequest {
  diarId: number
}

export interface GetAllPetResponse {
  petId: number
  petImg: string
  petName: string
}
