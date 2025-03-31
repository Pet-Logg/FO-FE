import { OneButtonModal } from '@/components/common/OneButtonModal'
import { SuccessPopup } from '@/components/common/SuccessPopup'
import { useCreatePet, useGetPet } from '@/services/pet'
import { useUpdatePet } from '@/services/pet/queries/useUpdatePet'
import { useEffect, useState } from 'react'
import { FaCamera } from 'react-icons/fa'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { PetData } from '../types/PetData'

export const CreatePet = () => {
  const nav = useNavigate()
  const [searchParams] = useSearchParams()
  const paramPetId = searchParams.get('petId') || null
  const { data } = useGetPet(Number(paramPetId))
  const createPetMutate = useCreatePet()
  const updatePetMutate = useUpdatePet()
  const location = useLocation()
  const [hasDisease, setHasDisease] = useState<boolean | null>(null) // 염려질환 있어요 버튼 선택됐는지
  const [hasAllergy, setHasAllergy] = useState<boolean | null>(null) // 알러지 있어요 버튼 선택됐는지
  const [showPopup, setShowPopup] = useState(false) // 팝업 상태
  const [isLoading, setIsLoading] = useState(false) // 로딩 상태
  const [petData, setPetData] = useState<PetData>({
    petId: null,
    petImg: null,
    petFile: null,
    petName: '',
    animal: '',
    petBirth: '',
    petBreed: '',
    petGender: '',
    petWeight: null,

    // 수정 모드에서만 필요한 데이터 추가 가능
    isNeutered: '', // 중성화 여부
    disease: [], // 염려질환
    allergy: [] // 알러지
  })

  const mode = location.state?.mode || 'create'

  // 펫 수정시 정보 가져오기
  useEffect(() => {
    if (data) {
      setPetData({
        ...data,
        petBirth: new Date(data.petBirth).toISOString().split('T')[0]
      })
    }
  }, [data])

  // 변경감지
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setPetData({ ...petData, [name]: value })
  }

  // 이미지 업로드
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // 파일 타입 확인
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드할 수 있습니다.')
      return
    }

    // 파일 업로드 전 크기 체크
    const maxSize = 10 * 1024 * 1024

    if (file.size > maxSize) {
      alert('파일 크기는 10MB를 초과할 수 없습니다.')
      return
    }

    const imageUrl = URL.createObjectURL(file) // 미리보기 URL 생성
    setPetData({ ...petData, petImg: imageUrl, petFile: file })
  }

  const today: string = new Date().toISOString().split('T')[0]

  const diseaseOptions = [
    '피부',
    '눈',
    '귀',
    '관절',
    '치아',
    '모질',
    '호흡기',
    '소화기',
    '체중',
    '노환',
    '신장'
  ]

  const allergyOptions = [
    '소고기',
    '유제품',
    '생선',
    '양고기',
    '말',
    '닭',
    '옥수수',
    '달걀'
  ]

  useEffect(() => {
    if (petData.disease && petData.disease.length > 0) {
      setHasDisease(true)
    } else {
      setHasDisease(false)
    }

    if (petData.allergy && petData.allergy.length > 0) {
      setHasAllergy(true)
    } else {
      setHasAllergy(false)
    }
  }, [petData.disease, petData.allergy])

  // 염려질환, 알러지 선택
  const handleSelectOption = (type: 'disease' | 'allergy', value: string) => {
    setPetData((data) => {
      const currentValues = data[type] || [] // ["피부", "눈"]
      const isSelected = currentValues.includes(value)

      return {
        ...data,
        [type]: isSelected
          ? currentValues.filter((item) => item !== value) // 이미선택된거면 제거
          : [...currentValues, value]
      }
    })
  }

  // 폼 제출하기
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 기본 폼 제출 동작 방지
    setIsLoading(true)

    if (!petData.petName || !petData.petBirth || !petData.petWeight) {
      alert('모든 필수 항목을 입력해주세요.')
      setIsLoading(false)
      return
    }

    if (mode !== 'edit' && (!petData.petFile || !petData.petImg)) {
      alert('귀여운 반려동물의 사진을 넣어주세요')
      setIsLoading(false)
      return
    }

    try {
      const formData = new FormData()

      if (petData.petFile) {
        formData.append('petImg', petData.petFile) // 새 이미지 추가
      }

      Object.entries(petData).forEach(([key, value]) => {
        if (key === 'petFile' || key === 'petImg') return

        if (value === null || value === undefined) {
          value = ''
        }

        formData.append(key, value)
      })

      if (mode === 'edit' && petData.petId !== null) {
        updatePetMutate.mutate(
          { petId: petData.petId, formData },
          {
            onSuccess: (data) => {
              console.log('반려동물 수정 성공!', data)
            },
            onError: (err) => {
              console.log(err)
            }
          }
        )
      } else {
        createPetMutate.mutate(
          { formData },
          {
            onSuccess: (data) => {
              console.log('반려동물 등록 성공!', data)
            },
            onError: (err) => {
              console.log(err)
            }
          }
        )
      }

      setShowPopup(true)
    } catch (error) {
      console.error(mode === 'edit' ? '수정 실패' : '등록 실패', error)
      alert(
        mode === 'edit'
          ? '펫 정보 수정에 실패했습니다.'
          : '펫 정보 등록에 실패했습니다.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {showPopup && mode === 'create' && <SuccessPopup />}
      {showPopup && mode === 'edit' && (
        <OneButtonModal
          text='수정이 완료되었습니다.'
          buttonName='확인'
          buttonType='normal'
          onConfirm={() => {
            nav('/petManagement')
          }}
        />
      )}

      <div className='flex h-full w-full items-center justify-center p-24 pt-7'>
        <div className='w-96 p-8'>
          <h2 className='mb-10 flex items-center text-4xl font-bold text-gray-700'>
            {mode === 'edit' ? '반려동물 수정' : '반려동물 등록'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-6'>
              <div className='flex w-full flex-col items-center'>
                <label className='flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-gray-50'>
                  {petData.petImg ? (
                    <img
                      src={petData.petImg}
                      alt='pet preview'
                      className='h-full w-full rounded-full object-cover'
                    />
                  ) : (
                    <FaCamera className='text-2xl text-gray-400' />
                  )}
                  <input
                    type='file'
                    className='hidden'
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
            </div>
            <div className='mb-9 flex w-full flex-col'>
              <div className='flex gap-1 font-bold'>
                <div className='mb-2'>반려동물</div>
                <div className='text-sm text-red-600'>*</div>
              </div>
              <div className='flex w-full gap-3'>
                <button
                  name='animal'
                  type='button'
                  className={`flex-1 rounded-md border py-2 ${
                    petData.animal === 'DOG' ? 'bg-orange-100' : ''
                  }`}
                  onClick={() => setPetData({ ...petData, animal: 'DOG' })}
                >
                  강아지
                </button>
                <button
                  name='animal'
                  type='button'
                  className={`flex-1 rounded-md border py-2 ${
                    petData.animal === 'CAT' ? 'bg-orange-100' : ''
                  }`}
                  onClick={() => setPetData({ ...petData, animal: 'CAT' })}
                >
                  고양이
                </button>
              </div>
            </div>
            <div className='mb-9'>
              <div className='flex items-start gap-1 font-bold'>
                <div className='mb-2'>이름</div>
                <div className='text-sm text-red-600'>*</div>
              </div>
              <input
                name='petName'
                type='text'
                value={petData.petName}
                onChange={onChangeInput}
                required
                className='w-full rounded-md border border-gray-200 px-3 py-2 focus:border-blue-300'
              />
            </div>
            <div className='mb-9'>
              <div className='flex items-start gap-1 font-bold'>
                <div className='mb-2'>생일</div>
                <div className='text-sm text-red-600'>*</div>
              </div>
              <input
                name='petBirth'
                type='date'
                max={today}
                value={petData.petBirth}
                onChange={onChangeInput}
                required
                className='w-full rounded-md border border-gray-200 px-3 py-2 focus:border-blue-300'
              />
            </div>
            <div className='mb-9'>
              <div className='flex items-start gap-1 font-bold'>
                <div className='mb-2'>견종/묘종</div>
                <div className='text-sm text-red-600'>*</div>
              </div>
              <input
                name='petBreed'
                type='text'
                value={petData.petBreed}
                onChange={onChangeInput}
                required
                className='w-full rounded-md border border-gray-200 px-3 py-2 focus:border-blue-300'
              />
            </div>
            <div className='mb-9'>
              <div className='flex gap-1 font-bold'>
                <div className='mb-2'>성별</div>
                <div className='text-sm text-red-600'>*</div>
              </div>
              <div className='flex w-full gap-3'>
                <button
                  name='petGender'
                  type='button'
                  className={`flex-1 rounded-md border py-2 ${
                    petData.petGender === 'MALE' ? 'bg-sky-100' : ' '
                  }`}
                  onClick={() => setPetData({ ...petData, petGender: 'MALE' })}
                >
                  남아
                </button>
                <button
                  name='petGender'
                  type='button'
                  className={`flex-1 rounded-md border py-2 ${
                    petData.petGender === 'FEMALE' ? 'bg-violet-100' : ' '
                  }`}
                  onClick={() =>
                    setPetData({ ...petData, petGender: 'FEMALE' })
                  }
                >
                  여아
                </button>
              </div>
            </div>

            <div className='mb-9'>
              <div className='flex gap-1 font-bold'>
                <div>몸무게</div>
                <div className='text-sm text-red-600'>*</div>
              </div>
              <p className='mb-2 text-xs text-gray-500'>
                1kg미만인 경우, 750g이라면 0.75 입력해주세요.
              </p>
              <div className='relative flex w-full'>
                <input
                  name='petWeight'
                  type='number'
                  min='0' // 0이상만 입력 가능
                  step='0.01' // 소수점 입력가능
                  value={petData.petWeight !== null ? petData.petWeight : ''}
                  onChange={onChangeInput}
                  required
                  className='flex-1 rounded-md border border-gray-200 bg-transparent py-2 pl-3 pr-10 backdrop-blur-md focus:outline-none'
                />
                <span className='absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-700'>
                  kg
                </span>
              </div>
            </div>

            {/* 수정 모드에서만 보이는 입력 필드 */}
            {mode === 'edit' && (
              <>
                <div className='mb-9 flex w-full flex-col'>
                  <div className='mb-2 font-bold'>중성화 여부</div>
                  <div className='flex w-full gap-3'>
                    <button
                      name='isNeutered'
                      type='button'
                      className={`flex-1 rounded-md border py-2 ${
                        petData.isNeutered === 'Y' ? 'bg-orange-100' : ''
                      }`}
                      onClick={() =>
                        setPetData({ ...petData, isNeutered: 'Y' })
                      }
                    >
                      했어요
                    </button>
                    <button
                      name='isNeutered'
                      type='button'
                      className={`flex-1 rounded-md border py-2 ${
                        petData.isNeutered === 'N' ? 'bg-orange-100' : ''
                      }`}
                      onClick={() =>
                        setPetData({ ...petData, isNeutered: 'N' })
                      }
                    >
                      안했어요
                    </button>
                  </div>
                </div>

                <div className='mb-9 flex w-full flex-col'>
                  <div className='mb-2 font-bold'>염려질환</div>
                  <div className='flex w-full gap-3'>
                    <button
                      name='disease'
                      type='button'
                      className={`flex-1 rounded-md border py-2 ${
                        hasDisease === true ? 'bg-orange-100' : ''
                      }`}
                      onClick={() => {
                        setHasDisease(true)
                      }}
                    >
                      있어요
                    </button>
                    <button
                      name='disease'
                      type='button'
                      className={`flex-1 rounded-md border py-2 ${
                        hasDisease === false ? 'bg-orange-100' : ''
                      }`}
                      onClick={() => {
                        setHasDisease(false)
                        setPetData((data) => ({
                          ...data,
                          disease: [] // 없어요 선택 시 초기화
                        }))
                      }}
                    >
                      없어요
                    </button>
                  </div>
                  <div>
                    {hasDisease === true && (
                      <div className='mt-2 flex flex-wrap gap-2'>
                        {diseaseOptions.map((disease) => (
                          <button
                            type='button'
                            key={disease}
                            className={`rounded-md border px-4 py-2 ${
                              petData.disease?.includes(disease)
                                ? 'bg-blue-100 font-bold text-white'
                                : ''
                            }`}
                            onClick={() =>
                              handleSelectOption('disease', disease)
                            }
                          >
                            {disease}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className='mb-9 flex w-full flex-col'>
                  <div className='mb-2 font-bold'>알러지</div>
                  <div className='flex w-full gap-3'>
                    <button
                      name='allergy'
                      type='button'
                      className={`flex-1 rounded-md border py-2 ${
                        hasAllergy === true ? 'bg-orange-100' : ''
                      }`}
                      onClick={() => setHasAllergy(true)}
                    >
                      있어요
                    </button>
                    <button
                      name='allergy'
                      type='button'
                      className={`flex-1 rounded-md border py-2 ${
                        hasAllergy === false ? 'bg-orange-100' : ''
                      }`}
                      onClick={() => {
                        setHasAllergy(false)
                        setPetData((data) => ({
                          ...data,
                          allergy: [] // 없어요 선택 시 초기화
                        }))
                      }}
                    >
                      없어요
                    </button>
                  </div>
                  <div>
                    {hasAllergy === true && (
                      <div className='mt-2 flex flex-wrap gap-2'>
                        {allergyOptions.map((allergy) => (
                          <button
                            type='button'
                            key={allergy}
                            className={`rounded-md border px-4 py-2 ${
                              petData.allergy?.includes(allergy)
                                ? 'bg-blue-100 font-bold text-white'
                                : ''
                            }`}
                            onClick={() =>
                              handleSelectOption('allergy', allergy)
                            }
                          >
                            {allergy}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
            <div>
              <button
                type='submit'
                className='w-full rounded-md bg-gray-800 px-4 py-3 text-white'
                disabled={isLoading}
              >
                {mode === 'edit' ? '수정하기' : '등록하기'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
