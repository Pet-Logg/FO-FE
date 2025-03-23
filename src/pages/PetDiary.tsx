import { Button } from 'antd'
import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { getDiaryById } from '../api/auth'
import defaultImg from '../assets/logo.png'
import { DiaryData } from '../types/DiaryData'

const PetDiary = () => {
  const nav = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [diaries, setDiaries] = useState<DiaryData[]>([])
  const MAX_CONTENT_LENGTH = 37 // 내용 최대 표시할 글자 수
  const MAX_TITLE_LENGTH = 10

  useEffect(() => {
    getDiaries()
  }, [])

  // 다이어리 목록 가져오기
  const getDiaries = async () => {
    try {
      const response = await getDiaryById()
      setDiaries(response)
    } catch (error) {
      console.error('다이어리 목록을 가져오는 중 오류 발생', error)
      alert('펫 목록 가져오기에 실패했습니다.')
    }
  }

  // 검색
  const filteredDiaries = diaries.filter(
    (diary) =>
      diary.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      diary.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      <div className='mx-auto min-h-[750px] w-[1050px] py-20'>
        <div className='mb-10 flex flex-row justify-between'>
          <Button
            type='primary'
            size='large'
            onClick={() => nav('/createPetDiary')}
          >
            ✏️ 일기 쓰기
          </Button>

          <div className='relative flex items-center'>
            <input
              type='text'
              placeholder='일기 검색'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-64 rounded-full border-2 border-orange-400 px-4 py-2 text-gray-700 focus:outline-none md:w-96'
            />
            <button type='button' className='absolute right-4 text-orange-500'>
              <FaSearch />
            </button>
          </div>
        </div>

        <div className='grid grid-cols-4 gap-x-5 gap-y-9'>
          {filteredDiaries.length > 0 ? (
            filteredDiaries.map((diary) => (
              <div
                key={diary.diaryId}
                className='cursor-pointer rounded-lg border p-5 shadow-md hover:shadow-lg'
                onClick={() => nav(`/petDiaryDetail/${diary.diaryId}`)}
              >
                <div className='flex items-center justify-between border-b pb-3'>
                  <span className='text-lg font-bold'>
                    {diary.title.length > MAX_TITLE_LENGTH
                      ? `${diary.title.substring(0, MAX_TITLE_LENGTH)}...`
                      : diary.title}
                  </span>
                  <span className='text-xs text-gray-500'>
                    {diary.createdAt.split('T')[0]}
                  </span>
                </div>
                <img
                  src={diary.imgUrl?.[0] || defaultImg}
                  alt='Diary Image'
                  className='mt-3 h-40 w-full rounded-md object-cover'
                />
                <p className='mt-4 text-sm text-gray-600'>
                  {diary.content.length > MAX_CONTENT_LENGTH
                    ? `${diary.content.substring(0, MAX_CONTENT_LENGTH)}...`
                    : diary.content}
                </p>
              </div>
            ))
          ) : (
            <div className='flex min-h-[600px] w-[1050px] items-center justify-center text-gray-500'>
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PetDiary
