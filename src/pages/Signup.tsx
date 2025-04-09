import { FormInput } from '@/components/common/FormInput'
import { useSignUp } from '@/services/auth'
import { useSignupForm } from '@/services/auth/hooks/useSignupForm'
import { useState } from 'react'

export const Signup = () => {
  const { form, handleInputChange } = useSignupForm()
  const [error, setError] = useState('')
  const signUpMutate = useSignUp()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 폼 제출 시 새로고침 방지
    setError('') // 이전 에러 초기화

    // 비밀번호 일치 확인
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    signUpMutate.mutate(
      { email: form.email, password: form.password },
      {
        onSuccess: (data) => {
          console.log('회원가입 성공!', data)
        },
        onError: (err) => {
          console.log(err)
        }
      }
    )
  }

  return (
    <>
      <div className='mx-auto flex min-h-[800px] w-[1050px] items-center justify-center'>
        <div className='w-96 rounded-lg border bg-white p-8'>
          <h2 className='mb-6 text-center text-2xl font-bold'>회원가입</h2>
          {error && <p className='mb-4 text-red-500'>{error}</p>}
          <form onSubmit={handleSubmit}>
            <FormInput
              title='이메일'
              name='email'
              type='email'
              required={true}
              onChange={handleInputChange}
            />
            <FormInput
              title='비밀번호'
              name='password'
              type='password'
              required={true}
              onChange={handleInputChange}
            />
            <FormInput
              title='비밀번호 확인'
              name='confirmPassword'
              type='password'
              required={true}
              onChange={handleInputChange}
            />
            <button
              type='submit'
              className='mt-5 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
            >
              회원가입
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
