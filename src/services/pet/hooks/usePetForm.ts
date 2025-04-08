import { useState, useEffect, ChangeEvent } from 'react'
import { PetData } from '@/types/PetData'

const MAX_IMAGE_SIZE = 10 * 1024 * 1024

export const usePetForm = (initialData?: PetData) => {
  const [petData, setPetData] = useState<PetData>({
    petId: null,
    petImg: null,
    petFile: null,
    petName: '',
    animal: '',
    petBirth: '',
    petBreed: '',
    petGender: '',
    petWeight: 0,

    // 수정 모드에서만 필요한 데이터 추가 가능
    isNeutered: '', // 중성화 여부
    disease: [], // 염려질환
    allergy: [] // 알러지
  })

  const [hasDisease, setHasDisease] = useState<boolean | null>(null) // 염려질환 있어요 버튼 선택됐는지
  const [hasAllergy, setHasAllergy] = useState<boolean | null>(null) // 알러지 있어요 버튼 선택됐는지

  // 펫 수정시 정보 가져오기
  useEffect(() => {
    if (initialData) {
      setPetData({
        ...initialData,
        petBirth: new Date(initialData.petBirth).toISOString().split('T')[0]
      })
    }
  }, [initialData])

  useEffect(() => {
    setHasDisease((petData.disease?.length ?? 0) > 0)
    setHasAllergy((petData.allergy?.length ?? 0) > 0)
  }, [petData.disease, petData.allergy])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPetData({ ...petData, [name]: value })
  }

  // 이미지 업로드
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 파일 타입 확인
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.')
      return
    }

    // 파일 업로드 전 크기 체크
    if (file.size > MAX_IMAGE_SIZE) {
      alert('파일 크기는 10MB를 초과할 수 없습니다.')
      return
    }

    const imageUrl = URL.createObjectURL(file)
    setPetData({ ...petData, petImg: imageUrl, petFile: file })
  }

  // 염려질환, 알러지 선택
  const handleSelectOption = (type: 'disease' | 'allergy', value: string) => {
    setPetData((data) => {
      const currentValues = data[type] || [] // ["피부", "눈"]
      const isSelected = currentValues.includes(value)

      return {
        ...data,
        [type]: isSelected
          ? currentValues.filter((item) => item !== value) // 이미선택된거면 제거
          : [...currentValues, value]
      }
    })
  }

  return {
    petData,
    setPetData,
    hasDisease,
    setHasDisease,
    hasAllergy,
    setHasAllergy,
    handleInputChange,
    handleImageUpload,
    handleSelectOption
  }
}
