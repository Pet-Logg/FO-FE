import { FormInput } from '@/components/common/FormInput'
import { useSignUp } from '@/services/auth'
import { useState } from 'react'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const signUpMutate = useSignUp()

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // 폼 제출 시 새로고침 방지
    setError('') // 이전 에러 초기화

    // 비밀번호 일치 확인
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    signUpMutate.mutate(
      { email, password },
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
              type='email'
              required={true}
              onChange={handleChangeEmail}
            />
            <FormInput
              title='비밀번호'
              type='password'
              required={true}
              onChange={handleChangePassword}
            />
            <FormInput
              title='비밀번호 확인'
              type='password'
              required={true}
              onChange={handleChangeConfirmPassword}
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

export default Signup
