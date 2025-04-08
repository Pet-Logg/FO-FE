import { Button } from '@/components/common/Button'
import { TwoButtonModal } from '@/components/common/TwoButtonModal'
import { useDeletePet, useGetPet } from '@/services/pet'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import basicPicture from '../assets/basicPicture.png'

const PetInfo = ({ label, value }) => {
  return (
    <>
      <p className='text-left font-medium'>{label}</p>
      <p>{value}</p>
    </>
  )
}

export const PetDetail = () => {
  const nav = useNavigate()
  const { petId } = useParams()
  const [openPopup, setOpenPopup] = useState(false)
  const { data, isLoading, isError, error } = useGetPet(Number(petId))
  const deletePetMutate = useDeletePet()

  const parsedPetId = petId ? Number(petId) : null // 문자열 → 숫자, 없으면 null

  const clickDeletePet = () => {
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
    <>
      {data && (
        <div className='flex min-h-[1000px] items-center justify-center bg-gray-100'>
          <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-lg'>
            {/* 펫 이미지 */}
            <img
              src={data.petImg || basicPicture}
              className='mx-auto mb-6 h-60 w-60 rounded-full border border-gray-300 object-cover'
            />

            <h1 className='mb-6 text-center text-3xl font-bold'>
              {data.petName}
            </h1>

            {/* 기본 정보 */}
            <div>
              <h1 className='mb-3 ml-2 text-lg font-bold'>🐶 기본 정보</h1>
              <div className='mx-10 grid grid-cols-2 gap-y-2 border-b pb-7'>
                <PetInfo
                  label={data.animal === 'DOG' ? '견종' : '묘종'}
                  value={data.petBreed || '-'}
                />

                <PetInfo
                  label='성별'
                  value={data.petGender === 'MALE' ? '남자' : '여자'}
                />

                <PetInfo
                  label='생일'
                  value={
                    data.petBirth
                      ? new Date(data.petBirth).toISOString().split('T')[0]
                      : '-'
                  }
                />
                <PetInfo label='몸무게' value={`${data.petWeight} kg`} />
              </div>
            </div>

            {/* 건강 정보 */}
            <div>
              <h1 className='mb-3 ml-2 pt-7 text-lg font-bold'>💊 건강 정보</h1>
              <div className='mx-10 grid grid-cols-2 gap-y-2'>
                <PetInfo
                  label='중성화 여부'
                  value={
                    data.isNeutered
                      ? data.isNeutered === 'Y'
                        ? '했어요'
                        : '안했어요'
                      : '-'
                  }
                />

                <PetInfo
                  label='염려질환'
                  value={data.disease?.length ? data.disease.join(', ') : '-'}
                />

                <PetInfo
                  label='알러지'
                  value={data.allergy?.length ? data.allergy.join(', ') : '-'}
                />
              </div>
            </div>

            <div className='flex justify-center gap-7 pt-9'>
              <Button
                text={'수정'}
                type={'normal'}
                onClick={() => {
                  nav(`/createPet?petId=${petId}`, {
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
      )}
    </>
  )
}
