import { useGetDiary } from '@/services/pet'
import { Button, Upload, UploadFile } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import logo from '../assets/logo.png'

export const PetDiaryDetail = () => {
  const { diaryId } = useParams()
  const navigate = useNavigate()

  // 다이어리 수정시 정보 가져오기
  const { data, isLoading, isError } = useGetDiary(Number(diaryId))

  if (isLoading) {
    return <div></div>
  }

  if (isError) {
    return (
      <div className='flex h-[800px] w-full items-center justify-center'>
        <p className='text-lg text-gray-500'>다이어리를 찾을 수 없습니다.</p>
      </div>
    )
  }

  const processImage = (imgUrls: string[]): UploadFile[] => {
    return imgUrls.map((url: string, index: number) => ({
      uid: `${index}`,
      name: `image-${index}`,
      url: url,
      status: 'done'
    }))
  }

  return (
    <div className='relative mx-auto mb-12 w-1/2 py-16'>
      {/* 펫 이미지 */}
      <div className='mb-5'>
        {data?.imgUrl && data.imgUrl.length > 0 && (
          <Upload
            listType='picture-card'
            fileList={processImage(data.imgUrl) || { logo }}
            showUploadList={{ showRemoveIcon: false }} // 삭제 버튼 숨김
            beforeUpload={() => false} // 실제 업로드 방지 (미리보기 용도)
          />
        )}
      </div>

      {/* 기본 정보 */}
      <div className='flex items-center justify-center'>
        <div className='h-[500px] w-full rounded-2xl border border-gray-300 px-6 py-6'>
          <div className='border-b border-gray-300'>
            <input
              type='text'
              className='mb-4 size-full h-8 bg-white text-2xl focus:outline-none'
              disabled
              value={data?.title}
            />
          </div>
          <div className='h-[388px] w-full'>
            <textarea
              className='mt-4 h-full w-full resize-none bg-white focus:outline-none'
              disabled
              value={data?.content}
            />
          </div>
        </div>
      </div>

      {/* 건강 정보 */}
      <div className='flex justify-end gap-3'>
        <div className='mt-10'>
          <Button
            type='primary'
            size='large'
            onClick={() => navigate('/petDiary')}
          >
            수정
          </Button>
        </div>
        <div className='mt-10 flex justify-end'>
          <Button
            type='primary'
            size='large'
            onClick={() => navigate('/petDiary')}
          >
            목록
          </Button>
        </div>
      </div>
    </div>
  )
}
