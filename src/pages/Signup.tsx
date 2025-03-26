import { useSignUp } from '@/services/auth'
import { useState } from 'react'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errer, setError] = useState('')
  const signUpMutate = useSignUp()

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
          if (err instanceof Error) {
            setError(err.message)
          } else {
            setError('알 수 없는 에러가 발생했습니다.')
          }
          console.log(err)
        }
      }
    )
  }

  return (
    <>
      <div className='mx-auto flex min-h-[650px] w-[1050px] items-center justify-center'>
        <div className='w-96 rounded-lg border bg-white p-8'>
          <h2 className='mb-6 text-center text-2xl font-bold'>회원가입</h2>
          {errer && <p className='mb-4 text-red-500'>{errer}</p>}
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label className='mb-2 block text-sm font-bold text-gray-700'>
                Email
              </label>
              <input
                type='email'
                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
                required
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className='mb-4'>
              <label className='mb-2 block text-sm font-bold text-gray-700'>
                비밀번호
              </label>
              <input
                type='password'
                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
                required
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div className='mb-4'>
              <label className='mb-2 block text-sm font-bold text-gray-700'>
                비밀번호 확인
              </label>
              <input
                type='password'
                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
              />
            </div>
            <button
              type='submit'
              className='focus:shadow-outline w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none'
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
