import { useGetAllDiary } from '@/services/pet/queries/useGetAllDiary'
import { Button } from 'antd'
import { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import defaultImg from '../assets/logo.png'

const PetDiary = () => {
  const nav = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const MAX_CONTENT_LENGTH = 37 // 내용 최대 표시할 글자 수
  const MAX_TITLE_LENGTH = 10

  // 다이어리 목록 가져오기
  const { data } = useGetAllDiary()

  // 검색
  const filteredDiaries = (data || []).filter(
    (data) =>
      data.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      data.content.toLowerCase().includes(searchQuery.toLowerCase())
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
            filteredDiaries.map((data) => (
              <div
                key={data.diaryId}
                className='cursor-pointer rounded-lg border p-5 shadow-md hover:shadow-lg'
                onClick={() => nav(`/petDiaryDetail/${data.diaryId}`)}
              >
                <div className='flex items-center justify-between border-b pb-3'>
                  <span className='text-lg font-bold'>
                    {data.title.length > MAX_TITLE_LENGTH
                      ? `${data.title.substring(0, MAX_TITLE_LENGTH)}...`
                      : data.title}
                  </span>
                  <span className='text-xs text-gray-500'>
                    {data.createdAt.split('T')[0]}
                  </span>
                </div>
                <img
                  src={data.imgUrl?.[0] || defaultImg}
                  alt='Diary Image'
                  className='mt-3 h-40 w-full rounded-md object-cover'
                />
                <p className='mt-4 text-sm text-gray-600'>
                  {data.content.length > MAX_CONTENT_LENGTH
                    ? `${data.content.substring(0, MAX_CONTENT_LENGTH)}...`
                    : data.content}
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
