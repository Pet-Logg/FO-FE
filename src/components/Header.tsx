import { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import cartImg from '../assets/cart.png'
import icon_user from '../assets/icon_user.svg'
import logo from '../assets/logo.png'

const Header = () => {
  const nav = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies(['Authorization'])
  const isLoggedin = !!cookies.Authorization
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const clickLogout = () => {
    removeCookie('Authorization', { path: '/' })
    nav('/')
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const closeClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', closeClickOutside)
    } else {
      document.removeEventListener('mousedown', closeClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', closeClickOutside)
    }
  }, [isOpen])

  return (
    <nav className='sticky top-0 z-50 bg-white px-24 py-4 shadow-sm'>
      <div className='m-auto flex w-[1050px] items-center justify-between'>
        <div>
          <Link to='/'>
            <img src={logo} alt='로고' className='h-14' />
          </Link>
        </div>

        <div className='flex w-4/5 items-center justify-end'>
          <div className='flex items-center gap-8'>
            <Link to='/products'>로그몰</Link>
            <Link to='/petManagement'>반려동물 관리</Link>
            <Link to='/petDiary'>육아일기</Link>
            <Link to='/cartView'>
              <img src={cartImg} alt='장바구니' className='h-6' />
            </Link>
          </div>
        </div>

        <div className='relative' ref={dropdownRef}>
          {isLoggedin ? (
            <>
              <button onClick={toggleDropdown}>
                <img src={icon_user} className='mt-2' />
              </button>
              {isOpen && (
                <div className='absolute right-0 mt-2 w-36 rounded-md border border-gray-300 bg-white shadow-lg'>
                  <ul className='py-2'>
                    <li>
                      <Link
                        to='/'
                        className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                      >
                        회원 정보 수정
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='/changePassword'
                        className='block px-4 py-2 text-gray-700 hover:bg-gray-100'
                      >
                        비밀번호 변경
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={clickLogout}
                        className='w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100'
                      >
                        로그아웃
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <>
              <Link to='/login' className='px-5'>
                로그인
              </Link>
              <Link to='signup'>회원가입</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
