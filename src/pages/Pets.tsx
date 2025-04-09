import { Button } from '@/components/common/Button'
import { useGetAllPet } from '@/services/pet'
import { useNavigate } from 'react-router-dom'
import basicPicture from '../assets/basicPicture.png'
import { getUserId } from '@/utils/getUserInfo'
import { useEffect } from 'react'

export const Pets = () => {
  const { data, isLoading, isError, error } = useGetAllPet()
  const nav = useNavigate()

  useEffect(() => {
    if (getUserId() === null) {
      nav('/login')
    }
  }, [nav])

  if (isLoading)
    return (
      <p className='mx-auto flex min-h-[750px] w-[1050px] items-center justify-center text-3xl'>
        ⏳ 로딩 중...
      </p>
    )

  if (isError)
    return (
      <p className='mx-auto flex min-h-[750px] w-[1050px] items-center justify-center text-3xl text-red-500'>
        {error.message}
      </p>
    )

  return (
    <div className='mx-auto flex min-h-[800px] w-[1050px] flex-col py-16'>
      <h1 className='mb-8 text-3xl font-bold'>반려동물 하우스 🏠</h1>
      <div className='mb-5 self-end'>
        <Button
          text='추가하기'
          type='normal'
          onClick={() => nav('/createPet')}
        />
      </div>

      {!isLoading && !isError && data?.length === 0 && (
        <p className='mx-auto flex min-h-[500px] items-center justify-center'>
          등록된 반려동물이 없습니다.
        </p>
      )}

      {!isLoading && !isError && (
        <div className='grid grid-cols-3 gap-6'>
          {data?.map((pet) => (
            <div
              key={pet.petId}
              className='pb-4 text-center'
              onClick={() => nav(`/getPetDetail/${pet.petId}`)}
            >
              <img
                src={pet.petImg || basicPicture}
                alt={pet.petName}
                className='mx-auto mb-4 h-60 w-60 cursor-pointer rounded-full'
                onClick={() => nav(`/getPetDetail/${pet.petId}`)}
              />
              <h2
                className='cursor-pointer text-xl font-semibold'
                onClick={() => nav(`/getPetDetail/${pet.petId}`)}
              >
                {pet.petName}
              </h2>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
