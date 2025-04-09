import { DiaryData } from '@/types/DiaryData'
import { message, UploadFile } from 'antd'
import { useState } from 'react'

type DiaryFormData = Partial<DiaryData>

export const useDiaryForm = () => {
  const [diaryData, setDiaryData] = useState<DiaryFormData>({
    title: '',
    content: '',
    images: []
  })

  // 변경감지
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setDiaryData({ ...diaryData, [name]: value })
  }

  // 이미지 업로드
  const handleImageUpload = ({ fileList }: { fileList: UploadFile[] }) => {
    if (fileList.length > 5) {
      message.error('최대 5장까지만 업로드 가능합니다.')
      return
    }
    setDiaryData({ ...diaryData, images: fileList })
  }

  // 이미지 삭제
  const handleRemoveImage = (file: UploadFile) => {
    const newImages = diaryData.images!.filter(
      (item: UploadFile) => item.uid !== file.uid
    )
    setDiaryData({ ...diaryData, images: newImages })
  }

  return {
    diaryData,
    handleInputChange,
    handleImageUpload,
    handleRemoveImage
  }
}
