import logo from '../assets/logo.png'

const CartView = () => {
  return (
    <div className='mx-auto min-h-[800px] w-[1050px] py-8'>
      {/* 단계 표시 */}
      <div className='mb-6 text-right text-sm text-gray-500'>
        <span className='font-bold text-black'>01 장바구니</span> &gt; 02 주문서
        작성/결제 &gt; 03 주문완료
      </div>

      <h1 className='mb-4 text-2xl font-bold'>장바구니</h1>

      {/* 테이블 형식 */}
      <div className='border-t border-gray-300'>
        <table className='w-full table-auto text-center'>
          <thead className='border-b border-gray-300 bg-gray-100'>
            <tr>
              <th className='p-3'>
                <input type='checkbox' />
              </th>
              <th className='p-3'>상품/옵션 정보</th>
              <th className='p-3'>상품금액</th>
              <th className='p-3'>수량</th>
              <th className='p-3'>합계금액</th>
              <th className='p-3'>배송비</th>
            </tr>
          </thead>
          <tbody>
            {/* 예시 상품 */}
            <tr className='border-b'>
              <td className='p-3'>
                <input type='checkbox' />
              </td>
              <td className='flex items-center gap-4 p-3'>
                <img src={logo} className='h-12' />
                <div>
                  <div className='font-medium'>예시 상품명</div>
                  <div className='text-sm text-gray-500'>옵션: 예시 옵션</div>
                </div>
              </td>
              <td className='p-3'>18,000원</td>
              <td className='p-3'>1</td>
              <td className='p-3'>18,000원</td>
              <td className='p-3'>무료</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* 선택 삭제 버튼 */}
      <div className='mt-6'>
        <button className='rounded border border-gray-400 px-4 py-2 hover:bg-gray-100'>
          선택 삭제
        </button>
      </div>
    </div>
  )
}

export default CartView
