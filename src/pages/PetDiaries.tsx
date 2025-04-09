import defaultImg from '@/assets/logo.png'
import { DiaryHeader, NoResult } from '@/components/diary'
import { useDiary, useGetAllDiary } from '@/services/diary'
import { getUserId } from '@/utils/getUserInfo'
import { searchData } from '@/utils/searchData'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const PetDiaries = () => {
  const nav = useNavigate()

  // 다이어리 목록 가져오기
  const { data } = useGetAllDiary()
  const { searchQuery, handleChangeSearchQuery } = useDiary()

  useEffect(() => {
    if (getUserId() === null) {
      nav('/login')
    }
  }, [nav])

  // 검색
  const filteredDiaries = searchData(data || [], searchQuery)

  // 다이어리 선택
  const handleDiaryClick = (id: number) => {
    nav(`/petDiaryDetail/${id}`)
  }

  return (
    <>
      <div className='mx-auto min-h-[750px] w-[1050px] py-20'>
        <DiaryHeader
          searchQuery={searchQuery}
          handleChangeSearchQuery={handleChangeSearchQuery}
        />

        <div className='grid grid-cols-4 gap-x-5 gap-y-9'>
          {filteredDiaries.length > 0 ? (
            filteredDiaries.map((data) => (
              <div
                key={data.diaryId}
                className='cursor-pointer rounded-lg border p-5 shadow-md hover:shadow-lg'
                onClick={() => handleDiaryClick(data.diaryId)}
              >
                <div className='flex items-center justify-between border-b pb-3'>
                  <span className='line-clamp-1 w-[120px] whitespace-pre-line text-lg font-bold'>
                    {data.title}
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
                <p className='mt-4 line-clamp-2 whitespace-pre-line text-sm text-gray-600'>
                  {data.content}
                </p>
              </div>
            ))
          ) : (
            <NoResult />
          )}
        </div>
      </div>
    </>
  )
}
