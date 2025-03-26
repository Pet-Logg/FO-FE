import { ChangePasswordRequest } from '@/services/auth'
import { useChangePassword } from '@/services/auth/queries/useChangePasswordUser'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

type ChangePasswordForm = ChangePasswordRequest & { confirmPassword: string }

const ChangePassword = () => {
  const nav = useNavigate()
  const changePasswordMutate = useChangePassword()
  const [passwordError, setPasswordError] = useState('') // 비밀번호 길이 오류
  const [isDisabled, setIsDisabled] = useState(true)
  const [formValues, setFormValues] = useState<ChangePasswordForm>({
    password: '',
    confirmPassword: ''
  })

  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?_])[A-Za-z\d!@#$%^&*?_]{8,16}$/

  // 비밀번호 유효성 검사
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedFormValues = { ...formValues, [name]: value }
    setFormValues(updatedFormValues)

    let passwordErr = ''

    // 비밀번호 정규식 검사
    if (name === 'password') {
      if (!passwordPattern.test(value) && value.length > 0) {
        passwordErr =
          '비밀번호는 8~16자, 영문, 숫자, 특수문자를 포함해야 합니다.'
        setPasswordError(passwordErr)
        return
      }
    }

    // 입력이 비어 있으면 오류 메시지 초기화
    if (value.length === 0) {
      passwordErr = ''
    }

    // 비밀번호 일치 검사
    if (name === 'confirmPassword' && value !== updatedFormValues.password) {
      passwordErr = '비밀번호가 일치하지 않습니다.'
      setPasswordError(passwordErr)
      return
    }

    // 버튼 활성화
    setIsDisabled(
      !!(
        passwordErr ||
        !updatedFormValues.password ||
        !updatedFormValues.confirmPassword
      )
    )
  }

  // 비밀번호 변경 API 호출
  const handleChangePassword = () => {
    if (isDisabled) return

    changePasswordMutate.mutate(
      { password: formValues.password },
      {
        onSuccess: (data) => {
          console.log('비밀번호 변경 성공!', data)
          alert('비밀번호가 성공적으로 변경되었습니다!')
          nav('/')
        },
        onError: (err) => {
          console.log(err)
          alert('비밀번호 변경에 실패했습니다.')
        }
      }
    )
  }

  return (
    <div className='mx-auto mt-40 min-h-[650px] w-[1050px]'>
      <div className='mb-6'>
        <h1 className='mb-2 text-3xl font-bold'>비밀번호 변경</h1>
        <span className='text-gray-600'>
          회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한번
          확인해주세요.
        </span>
      </div>

      <div className='mb-8 border-b border-t-2 p-12'>
        <div className='mx-auto w-2/3'>
          <div className='mx-auto mb-5 flex flex-col gap-1'>
            <div className='flex items-center'>
              <label className='mr-[80px] w-[320px] font-medium text-gray-700'>
                새로운 비밀번호
              </label>
              <div className='flex w-full flex-col'>
                <input
                  type='password'
                  name='password'
                  placeholder='새로운 비밀번호를 입력해주세요'
                  className='w-full rounded-md border border-gray-300 p-3 text-sm placeholder-gray-500 focus:border-gray-600 focus:outline-none focus:ring-0'
                  value={formValues.password}
                  onChange={onChangeInput}
                />
              </div>
            </div>
          </div>

          <div className='mx-auto flex flex-col gap-1'>
            <div className='flex items-center'>
              <label className='mr-[80px] w-[320px] font-medium text-gray-700'>
                새로운 비밀번호 확인
              </label>
              <div className='flex w-full flex-col'>
                <input
                  type='password'
                  name='confirmPassword'
                  placeholder='새로운 비밀번호를 다시 한 번 입력해주세요'
                  className='w-full rounded-md border border-gray-300 p-3 text-sm placeholder-gray-500 focus:border-gray-600 focus:outline-none focus:ring-0'
                  value={formValues.confirmPassword}
                  onChange={onChangeInput}
                />

                {passwordError && (
                  <p className='mt-1 text-sm text-red-500'>{passwordError}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <Button
          text={'완료'}
          type={'normal'}
          onClick={handleChangePassword}
          disabled={isDisabled}
        />
      </div>
    </div>
  )
}

export default ChangePassword
