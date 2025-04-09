import { OneButtonModal } from '@/components/common/OneButtonModal'
import { SuccessPopup } from '@/components/common/SuccessPopup'
import { ImgUpload } from '@/components/pet/ImgUpload'
import { PetInput } from '@/components/pet/PetInput'
import { PetOptionSelect } from '@/components/pet/PetOptionSelect'
import { SelectableOptionGroup } from '@/components/pet/SelectableOptionGroup'
import {
  allergyOptions,
  diseaseOptions,
  useCreatePet,
  useGetPet,
  usePetForm,
  useUpdatePet
} from '@/services/pet'
import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

export const CreatePet = () => {
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const paramPetId = searchParams.get('petId') || null
  const { data } = useGetPet(Number(paramPetId))
  const { mutate: createPetMutate, isPending: createPetIsPending } =
    useCreatePet()
  const { mutate: updatePetMutate, isPending: updatePetIsPending } =
    useUpdatePet()
  const location = useLocation()
  const {
    petData,
    setPetData,
    hasDisease,
    setHasDisease,
    hasAllergy,
    setHasAllergy,
    handleInputChange,
    handleImageUpload,
    handleSelectOption
  } = usePetForm(data)
  const [showPopup, setShowPopup] = useState(false) // 팝업 상태

  const mode = location.state?.mode || 'create'

  // 폼 제출하기
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 기본 폼 제출 동작 방지

    if (!petData.petName || !petData.petBirth || !petData.petWeight) {
      alert('모든 필수 항목을 입력해주세요.')
      return
    }

    if (mode !== 'edit' && (!petData.petFile || !petData.petImg)) {
      alert('귀여운 반려동물의 사진을 넣어주세요')
      return
    }

    const formData = new FormData()

    if (petData.petFile) {
      formData.append('petImg', petData.petFile) // 새 이미지 추가
    }

    Object.entries(petData).forEach(([key, value]) => {
      if (key === 'petFile' || key === 'petImg') return

      formData.append(key, value ?? '')
    })

    const onSuccess = () => {
      setShowPopup(true)
    }

    const onError = (err: unknown) => {
      console.error(`${mode === 'edit' ? '수정' : '등록'} 실패`, err)
      alert(
        mode === 'edit'
          ? '펫 정보 수정에 실패했습니다.'
          : '펫 정보 등록에 실패했습니다.'
      )
    }

    if (mode === 'edit' && petData.petId !== null) {
      updatePetMutate(
        { petId: petData.petId, formData },
        {
          onSuccess,
          onError
        }
      )
    } else {
      createPetMutate(
        { formData },
        {
          onSuccess,
          onError
        }
      )
    }
  }

  return (
    <>
      <div className='flex h-full w-full items-center justify-center p-24 pt-7'>
        <div className='w-96 p-8'>
          <h2 className='mb-10 flex items-center text-4xl font-bold text-gray-700'>
            {mode === 'edit' ? '반려동물 수정' : '반려동물 등록'}
          </h2>
          <form onSubmit={handleSubmit}>
            {/* 이미지 올리기 */}
            <ImgUpload
              petImg={petData.petImg}
              handleImageUpload={handleImageUpload}
            />

            {/* 반려동물 */}
            <PetOptionSelect
              label='반려동물'
              name='animal'
              petData={petData.animal}
              options={[
                { value: 'DOG', text: '강아지' },
                { value: 'CAT', text: '고양이' }
              ]}
              onSelect={(value) => setPetData({ ...petData, animal: value })}
            />

            {/* 이름 */}
            <PetInput
              label='이름'
              name='petName'
              value={petData.petName}
              onChange={handleInputChange}
            />

            {/* 생일 */}
            <PetInput
              label='생일'
              name='petBirth'
              type='date'
              value={petData.petBirth}
              onChange={handleInputChange}
            />

            {/* 견종/묘종 */}
            <PetInput
              label='견종/묘종'
              name='petBreed'
              value={petData.petBreed}
              onChange={handleInputChange}
            />

            {/* 성별 */}
            <PetOptionSelect
              label='성별'
              name='petGender'
              petData={petData.petGender}
              options={[
                { value: 'MALE', text: '남아' },
                { value: 'FEMALE', text: '여아' }
              ]}
              onSelect={(value) => setPetData({ ...petData, petGender: value })}
            />

            {/* 몸무게 */}
            <PetInput
              label='몸무게'
              name='petWeight'
              type='number'
              description='1kg미만인 경우, 750g이라면 0.75 입력해주세요.'
              value={petData.petWeight}
              onChange={handleInputChange}
            />

            {/* 수정 모드에서만 보이는 입력 필드 */}
            {mode === 'edit' && (
              <>
                {/*중성화 여부*/}
                <PetOptionSelect
                  label='중성화 여부'
                  name='isNeutered'
                  petData={petData.isNeutered}
                  options={[
                    { value: 'Y', text: '했어요' },
                    { value: 'N', text: '안했어요' }
                  ]}
                  onSelect={(value) =>
                    setPetData({ ...petData, isNeutered: value })
                  }
                />

                {/* 염려질환 */}
                <SelectableOptionGroup
                  title='염려질환'
                  type='disease'
                  options={diseaseOptions}
                  hasOption={hasDisease}
                  setHasOption={setHasDisease}
                  petData={petData}
                  setPetData={setPetData}
                  handleSelectOption={handleSelectOption}
                />

                {/* 알러지 */}
                <SelectableOptionGroup
                  title='알러지'
                  type='allergy'
                  options={allergyOptions}
                  hasOption={hasAllergy}
                  setHasOption={setHasAllergy}
                  petData={petData}
                  setPetData={setPetData}
                  handleSelectOption={handleSelectOption}
                />
              </>
            )}
            <div>
              <button
                type='submit'
                className='w-full rounded-md bg-gray-800 px-4 py-3 text-white'
                disabled={createPetIsPending || updatePetIsPending}
              >
                {mode === 'edit' ? '수정하기' : '등록하기'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showPopup &&
        (mode === 'create' ? (
          <SuccessPopup />
        ) : (
          <OneButtonModal
            text='수정이 완료되었습니다.'
            buttonName='확인'
            buttonType='normal'
            onConfirm={() => {
              nav('/pets')
            }}
          />
        ))}
    </>
  )
}
