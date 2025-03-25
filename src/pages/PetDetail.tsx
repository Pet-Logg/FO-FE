import { useGetPet } from '@/services/pet'
import { useDeletePet } from '@/services/pet/queries/useDeletePet'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import basicPicture from '../assets/basicPicture.png'
import Button from '../components/Button'
import TwoButtonModal from '../components/TwoButtonModal'
import { PetData } from '../types/PetData'

const PetDetail = () => {
  const nav = useNavigate()
  const { petId } = useParams()
  const parsedPetId = petId ? Number(petId) : null // 문자열 → 숫자, 없으면 null

  const [pet, setPet] = useState<PetData | null>(null)
  const [openPopup, setOpenPopup] = useState(false)
  const deletePetMutate = useDeletePet()

  // 펫 정보 가져오기
  const { data, isLoading, isError, error } = useGetPet(Number(petId))

  useEffect(() => {
    if (data) {
      setPet(data)
    }
  }, [data])

  const clickDeletePet = async () => {
    if (parsedPetId) {
      deletePetMutate.mutate(
        { petId: parsedPetId },
        {
          onSuccess: (data) => {
            console.log('반려동물 삭제 성공!', data)
            nav('/petManagement')
          },
          onError: (err) => {
            console.log(err)
          }
        }
      )
    }
  }

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
    <div className='flex min-h-[1000px] items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-lg'>
        <img
          src={pet?.petImg || basicPicture}
          className='mx-auto mb-6 h-60 w-60 rounded-full border border-gray-300 object-cover'
        />

        <h1 className='mb-6 text-center text-3xl font-bold'>{pet?.petName}</h1>

        <div>
          <h1 className='mb-3 ml-2 text-lg font-bold'>🐶 기본 정보</h1>
          <div className='mx-10 grid grid-cols-2 gap-y-2 border-b pb-5'>
            <p className='text-left font-medium'>
              {pet?.animal === 'DOG' ? '견종' : '묘종'}
            </p>
            <p>{pet?.petBreed || '-'}</p>

            <p className='text-left font-medium'>성별</p>
            <p>
              {pet?.petGender
                ? pet.petGender === 'MALE'
                  ? '남자'
                  : '여자'
                : '-'}
            </p>

            <p className='text-left font-medium'>생일</p>
            <p>
              {pet?.petBirth
                ? new Date(pet.petBirth).toISOString().split('T')[0]
                : '-'}
            </p>

            <p className='text-left font-medium'>몸무게</p>
            <p>{pet?.petWeight ? `${pet?.petWeight} kg` : '-'} </p>
          </div>

          <h1 className='mb-3 ml-2 pt-5 text-lg font-bold'>💊 건강 정보</h1>
          <div className='mx-10 grid grid-cols-2 gap-y-2'>
            <p className='text-left font-medium'>중성화 여부</p>
            <p>
              {pet?.isNeutered
                ? pet?.isNeutered === 'Y'
                  ? '했어요'
                  : '안했어요'
                : '-'}
            </p>

            <p className='text-left font-medium'>염려질환</p>
            <p>{pet?.disease?.length ? pet?.disease.join(', ') : '-'}</p>

            <p className='text-left font-medium'>알러지</p>
            <p>{pet?.allergy?.length ? pet?.allergy.join(', ') : '-'}</p>
          </div>
        </div>

        <div className='flex justify-center gap-7 pt-9'>
          <Button
            text={'수정'}
            type={'normal'}
            onClick={() => {
              nav(`/createPetInfo?petId=${petId}`, {
                state: { mode: 'edit' }
              })
            }}
          />
          <Button
            text={'삭제'}
            type={'delete'}
            onClick={() => setOpenPopup(true)}
          />
        </div>
      </div>

      {openPopup && (
        <TwoButtonModal
          text='반려동물을 삭제하시겠습니까?'
          subText='삭제한 반려동물은 복구할 수 없습니다.'
          firstButton='삭제'
          secondButton='취소'
          firstType='delete'
          secondType='cancel'
          onCancle={() => {
            setOpenPopup(false)
          }}
          onConfirm={clickDeletePet}
        />
      )}
    </div>
  )
}

export default PetDetail
