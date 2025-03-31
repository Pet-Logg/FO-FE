import { Button } from 'antd'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface DiaryHeaderPrpos {
  searchQuery: string
  handleChangeSearchQuery: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const DiaryHeader = ({
  searchQuery,
  handleChangeSearchQuery
}: DiaryHeaderPrpos) => {
  const nav = useNavigate()

  return (
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
          onChange={handleChangeSearchQuery}
          className='w-64 rounded-full border-2 border-orange-400 px-4 py-2 text-gray-700 focus:outline-none md:w-96'
        />
        <button type='button' className='absolute right-4 text-orange-500'>
          <FaSearch />
        </button>
      </div>
    </div>
  )
}
