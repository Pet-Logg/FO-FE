export const Footer = () => {
  return (
    <div className='h-80 bg-[#6b6867] text-[#CCCCCC]'>
      <div className='mx-auto flex w-3/6 flex-row justify-between pt-20'>
        <div className='flex flex-col space-y-1'>
          <h1 className='fond-bold pb-5 font-gamhong text-4xl text-yellow-400'>
            Pet Log
          </h1>
          <a>회사소개</a>
          <a>개인정보처리방침</a>
          <a>이용약관</a>
        </div>

        <div className='border-l border-gray-500 pl-12'>
          <h1 className='pb-5 text-xl font-bold text-yellow-400'>고객센터</h1>
          <p className='text-3xl font-bold text-white'>1688-0000</p>
          <p className='text-sm'>평일 09:00 ~ 18:00</p>
          <p className='text-sm'>주말, 공휴일 휴무</p>
          <p className='text-sm'>영업시간 외에는 1:1 게시판을 이용해주세요.</p>
        </div>

        <div className='border-l border-gray-500 pl-12'>
          <h1 className='pb-5 text-xl font-bold text-yellow-400'>
            무통장 입금
          </h1>
          <p className='text-3xl font-bold text-white'>1234-56-78900</p>
          <p>국민은행 김호박</p>
        </div>
      </div>
    </div>
  )
}
