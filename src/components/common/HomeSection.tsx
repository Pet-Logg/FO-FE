import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface HomeSectionProps {
  children: React.ReactNode
}

export const HomeSection = ({ children }: HomeSectionProps) => {
  const ref = useRef(null)
  const inView = useInView(ref, {
    once: true,
    amount: 0.7 // 요소의 70%보였을때 감지
  })
  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [inView, controls])

  return (
    <motion.div
      ref={ref}
      initial='hidden'
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 }, // 초기상태, 원래 위치보다 50px 아래에 위치
        visible: { opacity: 1, y: 0, transition: { duration: 1.5 } } // 애니메이션이 1.5초동안 진행
      }}
      className='mx-auto py-10'
    >
      {children}
    </motion.div>
  )
}
