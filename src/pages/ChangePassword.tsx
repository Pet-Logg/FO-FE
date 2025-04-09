import { Button } from '@/components/common/Button'
import { ChangePasswordInput } from '@/components/user/ChangePasswordInput'
import { useChangePassword } from '@/services/auth'
import { usePasswordFrom } from '@/services/auth/hooks'
import { useNavigate } from 'react-router-dom'

export const ChangePassword = () => {
  const nav = useNavigate()
  const changePasswordMutate = useChangePassword()
  const { passwordError, isDisabled, formValues, handleInputChange } =
    usePasswordFrom()

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
          <div className='flex flex-col gap-9'>
            {/* 새로운 비밀번호 입력 */}
            <ChangePasswordInput
              label={'새로운 비밀번호'}
              name={'password'}
              placeholder={'새로운 비밀번호를 입력해주세요.'}
              password={formValues.password}
              onChangeInput={handleInputChange}
            />

            {/* 새로운 비밀번호 입력 확인 */}
            <ChangePasswordInput
              label={'새로운 비밀번호 확인'}
              name={'confirmPassword'}
              placeholder={'새로운 비밀번호를 다시 한 번 입력해주세요.'}
              password={formValues.confirmPassword}
              onChangeInput={handleInputChange}
            />
          </div>

          {passwordError && (
            <div className='flex'>
              <div className='w-[220px]'></div>
              <p className='mt-1 text-sm text-red-500'>{passwordError}</p>
            </div>
          )}
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
