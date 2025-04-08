import { useCreateDiary } from '@/services/diary'
import { useDiaryForm } from '@/services/diary/hooks/useDiaryForm'
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

          <div className='flex items-center justify-center'>
            <div className='h-[500px] w-3/4 rounded-2xl border border-gray-300 px-6 py-6'>
              <div className='border-b border-gray-300'>
                <input
                  type='text'
                  placeholder='제목을 입력하세요.'
                  className='mb-4 size-full h-8 text-2xl focus:outline-none'
                  name='title'
                  value={diaryData.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className='h-[388px] w-full'>
                <textarea
                  placeholder='내용을 입력하세요.'
                  className='mt-4 h-full w-full resize-none focus:outline-none'
                  name='content'
                  value={diaryData.content}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

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
