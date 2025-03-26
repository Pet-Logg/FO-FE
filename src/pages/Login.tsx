import { useLogin } from '@/services/auth/queries/useLogin'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cookie, setCookie] = useCookies(['Authorization'])
  const nav = useNavigate()
  const loginMutate = useLogin()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // 1. 폼 제출 시 기본 동작(페이지 새로고침) 방지
    e.preventDefault()

    setError('')

    loginMutate.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          console.log('로그인 성공!', data)
          setCookie('Authorization', data, { path: '/' })
          nav('/')
        },
        onError: (err) => {
          setError('로그인에 실패했습니다.')
          console.log(err)
        }
      }
    )
  }

  return (
    <>
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='w-96 rounded-lg bg-white p-8 shadow-md'>
          <h2 className='mb-6 text-center text-2xl font-semibold'>로그인</h2>
          <form onSubmit={handleSubmit} id='loginForm'>
            <div className='mb-4'>
              {error && <p className='mb-4 text-red-500'>{error}</p>}
              <label
                htmlFor='email'
                className='mb-2 block text-sm font-bold text-gray-700'
              >
                이메일
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
                required
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='password'
                className='mb-2 block text-sm font-bold text-gray-700'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
                required
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div className='mb-6 flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='remember'
                  name='remember'
                  className='h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500'
                />
                <label
                  htmlFor='remember'
                  className='text-grㄹay-900 ml-2 block text-sm'
                >
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

export default Login
