import { Content } from '@/components/diary/Content'
import { useCreateDiary } from '@/services/diary'
import { useDiaryForm } from '@/services/diary/hooks'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Upload, UploadFile } from 'antd'
import { useNavigate } from 'react-router-dom'

export const CreatePetDiary = () => {
  const nav = useNavigate()
  const createDiaryMutate = useCreateDiary()
  const { diaryData, handleInputChange, handleImageUpload, handleRemoveImage } =
    useDiaryForm()

  // 폼 제출하기
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 기본 폼 제출 동작 방지

    if (!diaryData.title) {
      alert('제목을 입력해주세요.')
      return
    }
    if (!diaryData.content) {
      alert('내용을 입력해주세요.')
      return
    }

    const formData = new FormData()
    formData.append('title', diaryData.title)
    formData.append('content', diaryData.content)

    // 이미지 파일 추가
    diaryData.images?.forEach((file: UploadFile) => {
      if (file.originFileObj) {
        // originFileObj은 실제 파일
        formData.append('images', file.originFileObj)
      }
    })

    createDiaryMutate.mutate(
      { formData },
      {
        onSuccess: (data) => {
          console.log('반려동물 등록 성공!', data)
          nav('/petDiaries')
        },
        onError: (err) => {
          console.log(err)
        }
      }
    )
  }

  return (
    <>
      <div className='relative mb-12 w-full px-72 py-16'>
        <h2 className='mb-10 ml-36 text-4xl font-bold text-gray-700'>
          일기 작성
        </h2>
        <form onSubmit={handleSubmit}>
          {/* 이미지 업로드 */}
          <div className='mb-5 ml-36'>
            <Upload
              listType='picture-card'
              fileList={diaryData.images}
              onChange={handleImageUpload}
              onRemove={handleRemoveImage}
              beforeUpload={() => false} // 실제 업로드 X, 미리보기만
            >
              {diaryData.images!.length >= 5 ? null : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>사진 추가</div>
                </div>
              )}
            </Upload>
          </div>

          {/* 본문 */}
          <Content
            titleValue={diaryData.title}
            contentValue={diaryData.content}
            handleInputChange={handleInputChange}
          />

          <div className='absolute right-1/4 mt-4'>
            <Button type='primary' htmlType='submit'>
              완료
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
