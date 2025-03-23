import { Button, Upload, UploadFile } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getDiaryDetailById } from '../api/auth'
import { DiaryData } from '../types/DiaryData'

const PetDiaryDetail = () => {
  const { diaryId } = useParams()
  const navigate = useNavigate()
  const [fileList, setFileList] = useState<UploadFile[]>([])

  const [diary, setDiary] = useState<DiaryData>({
    diaryId: 0,
    title: '',
    content: '',
    imgUrl: [],
    createdAt: ''
  })

  useEffect(() => {
    if (diaryId) {
      getDiaryDetail(Number(diaryId))
    }
  }, [diaryId])

  const getDiaryDetail = async (id: number) => {
    try {
      const response = await getDiaryDetailById(id)
      setDiary(response.data[0])

      if (response.data[0]?.imgUrl) {
        const files: UploadFile[] = response.data[0].imgUrl.map(
          (url: string, index: number) => ({
            uid: `${index}`,
            name: `image-${index}`,
            url: url, // 백엔드에서 받은 이미지 URL
            status: 'done'
          })
        )
        setFileList(files)
      }
    } catch (error) {
      console.error('다이어리 상세 정보를 가져오는 중 오류 발생', error)
      alert('다이어리 정보를 가져올 수 없습니다.')
    }
  }

  if (!diary) {
    return (
      <div className='flex h-[800px] w-full items-center justify-center'>
        <p className='text-lg text-gray-500'>다이어리를 찾을 수 없습니다.</p>
      </div>
    )
  }

  return (
    <div className='relative mx-auto mb-12 w-1/2 py-16'>
      <div className='mb-5'>
        {fileList.length > 0 && (
          <Upload
            listType='picture-card'
            fileList={fileList}
            showUploadList={{ showRemoveIcon: false }} // 삭제 버튼 숨김
            beforeUpload={() => false} // 실제 업로드 방지 (미리보기 용도)
          />
        )}
      </div>

      <div className='flex items-center justify-center'>
        <div className='h-[500px] w-full rounded-2xl border border-gray-300 px-6 py-6'>
          <div className='border-b border-gray-300'>
            <input
              type='text'
              className='mb-4 size-full h-8 bg-white text-2xl focus:outline-none'
              disabled
              value={diary.title}
            />
          </div>
          <div className='h-[388px] w-full'>
            <textarea
              className='mt-4 h-full w-full resize-none bg-white focus:outline-none'
              disabled
              value={diary.content}
            />
          </div>
        </div>
      </div>

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

export default PetDiaryDetail
