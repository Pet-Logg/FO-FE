import { useEffect, useState } from 'react'
import Confetti from 'react-confetti'
import { useNavigate } from 'react-router-dom'
import { Button } from './Button'

export const SuccessPopup: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true)
  const nav = useNavigate()
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000) // 3초후 Confetti 사라짐
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showConfetti && <Confetti />}

      <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40'>
        <div className='relative w-80 rounded-lg bg-white p-12 text-center shadow-lg'>
          <div className='text-6xl'>🥳</div>
          <h2 className='mt-3 text-4xl'>반려동물 등록 완료!</h2>
          <p className='mt-2'>
            함께하고 싶은 친구들에게 반려동물을 공유해 보세요!
          </p>

          <div className='mt-6 flex justify-center'>
            <Button
              text='확인'
              type='normal'
              onClick={() => {
                nav('/petManagement')
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
