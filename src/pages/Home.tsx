import { ImageSlider } from '@/components/common/ImageSlider'
import home_section_001 from '../assets/home_section_001.png'
import { Section } from './Section'

export function Home() {
  return (
    <div className='mx-auto w-[1050px] py-20'>
      <div className='z-0'>
        {/* <ImageSlider /> */}
        <ImageSlider />
      </div>

      <Section>
        <div className='flex items-center justify-around'>
          <div>
            <h2 className='text-3xl font-bold'>
              📸 내 반려동물을 정확하고 한눈에 관리해요!
            </h2>
            <p className='text-lg text-gray-700'>
              반려동물의 이름, 나이, 품종, 특징을 등록해 나만의 펫 프로필을
              만들어보세요.
            </p>
          </div>
          <img src={home_section_001} className='w-[400px]' />
        </div>
      </Section>

      <Section>
        <div className='flex items-center justify-around'>
          <div>
            <h2 className='text-3xl font-bold'>
              📝 오늘의 기록, 펫로그에 남기기
            </h2>
            <p className='text-lg text-gray-700'>
              산책 사진, 귀여운 일상, 오늘의 상태를 펫로그에 가득 남겨보세요!
            </p>
          </div>
          <img src={home_section_001} className='w-[400px]' />
        </div>
      </Section>

      <Section>
        <div className='flex items-center justify-around'>
          <div>
            <h2 className='text-3xl font-bold'>
              🛍️ 맛있는 사료와 간식도 구매해요!
            </h2>
            <p className='text-lg text-gray-700'>
              마음에 드는 상품을 장바구니에 저장해두고, 필요할 때 바로 구매할 수
              있어요.
            </p>
          </div>
          <img src={home_section_001} className='w-[400px]' />
        </div>
      </Section>
    </div>
  )
}
