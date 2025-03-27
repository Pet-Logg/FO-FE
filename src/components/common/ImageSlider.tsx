import 'swiper/css'
import 'swiper/css/pagination'

import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperClass } from 'swiper'

import banner1 from '../../assets/home_img_001.png'
import banner2 from '../../assets/home_img_002.png'
import banner3 from '../../assets/home_img_003.png'

import { useEffect, useRef, useState } from 'react'

export const ImageSlider = () => {
  const paginationRef = useRef<HTMLDivElement>(null)
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null)

  const images = [banner1, banner2, banner3]

  useEffect(() => {
    if (
      swiperInstance && // Swiper 초기화  확인
      swiperInstance.params.pagination && // pagination 기능 설정 확인
      typeof swiperInstance.params.pagination !== 'boolean' // 상세 객체로 들어왔는지 확인
    ) {
      swiperInstance.params.pagination.el = paginationRef.current // pagination 렌더링 위치 지정
      swiperInstance.pagination.init()
      swiperInstance.pagination.render()
      swiperInstance.pagination.update()
    }
  }, [swiperInstance])

  return (
    <div className='main_swiper_wrap'>
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        loop={true}
        speed={1800}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false
        }}
        pagination={{
          el: paginationRef.current, // 우리가 만든 bullet div에 넣을 것
          clickable: true
        }}
        onSwiper={(swiper) => {
          setSwiperInstance(swiper) // Swiper 인스턴스를 상태로 저장
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`slide-${index}`}
              className='main_swiper_image'
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div ref={paginationRef} className='custom-swiper-pagination' />
    </div>
  )
}
