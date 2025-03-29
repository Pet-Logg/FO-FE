import { FormInput } from '@/components/common/FormInput'
import { useLogin } from '@/services/auth/queries/useLogin'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()
  const loginMutate = useLogin()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError('')

    loginMutate.mutate(
      { email, password },
      {
        onSuccess: () => {
          nav('/')
        },
        onError: (err) => {
          setError('아이디 또는 비밀번호를 잘못입력하셨습니다.')
          console.log(err)
        }
      }
    )
  }

  return (
    <>
      <div className='mx-auto flex min-h-[850px] w-[1050px] items-center justify-center'>
        <div className='w-96 rounded-lg border p-8'>
          <h2 className='mb-6 text-center text-2xl font-bold'>로그인</h2>
          {error && <p className='mb-4 text-red-500'>{error}</p>}
          <form onSubmit={handleSubmit} id='loginForm'>
            <FormInput
              title={'이메일'}
              type={'email'}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <FormInput
              title={'비밀번호'}
              type={'password'}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <div className='mb-6 flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  name='remember'
                  className='text-blue-60 h-4 w-4 rounded border-gray-300'
                />
                <label className='text-grㄹay-900 ml-2 block text-sm'>
                  자동로그인
                </label>
              </div>
              <div className='text-sm'>
                <a
                  href='#'
                  className='font-medium text-blue-600 hover:text-blue-500'
                >
                  비밀번호를 잊으셨나요?
                </a>
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='focus:shadow-outline w-full rounded-md bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:outline-none'
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
