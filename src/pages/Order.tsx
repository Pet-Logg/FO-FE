import { OrderProgress } from '@/components/cart/OrderProgress'
import { useGetOrderSheet } from '@/services/cart'
import { useOrder } from '@/services/cart/hooks/useOrder'
import { useCreateOrder } from '@/services/order/queries/useCreateOrder'
import { useLocation } from 'react-router-dom'

export const Order = () => {
  const location = useLocation()
  const { selectedItems = [] } = location.state || {}
  const { data } = useGetOrderSheet(selectedItems)
  const { recipient, phone, address, agree, setAgree, handleInputChange } =
    useOrder()
  const createOrderMutate = useCreateOrder()

  const handlePayment = () => {
    if (!recipient || !phone || !address || !agree) {
      alert('모든 정보를 입력하고 동의해주세요.')
      return
    }

    // 주문 요청 데이터 구성
    const CreateOrderRequestDto = {
      recipient,
      phone,
      address,
      totalPrice,
      items:
        data?.map((item) => ({
          productId: item.productId,
          quantity: item.quantity
        })) || []
    }

    createOrderMutate.mutate(CreateOrderRequestDto, {
      onSuccess: () => {
        console.log('주문에 성공했습니다.')
      },
      onError: () => {
        console.log('주문에 실패했습니다.')
      }
    })
    alert('결제가 완료되었습니다.')
  }

  // 전체 금액 계산
  const sumPrice =
    data?.reduce((acc, item) => acc + item.price * item.quantity, 0) ?? 0

  // 배송비
  const deliveryFee = 3000

  // 배송비 포함 전체금액 계산
  const totalPrice = sumPrice + deliveryFee

  return (
    <div className='mx-auto min-h-[800px] w-[1050px] py-12'>
      {/* 단계 표시 */}
      <OrderProgress currentStep={2} />
      <h1 className='mb-10 text-3xl font-bold'>주문하기</h1>

      <div className='mx-auto w-[500px]'>
        {/* 배송지 정보 */}
        <div className='mb-9 rounded-2xl border border-gray-200 px-6 py-4'>
          <h2 className='mb-4 text-lg font-bold'>📦 배송지</h2>
          <div className='flex flex-col gap-2'>
            <input
              type='text'
              placeholder='받는 분 성함'
              name='recipient'
              value={recipient}
              onChange={handleInputChange}
              className='w-full rounded border px-4 py-2'
            />
            <input
              type='tel'
              placeholder='전화번호 (010-1234-5678)'
              name='phone'
              value={phone}
              onChange={handleInputChange}
              className='w-full rounded border px-4 py-2'
            />
            <input
              type='text'
              name='address'
              placeholder='주소 (도로명 + 상세주소)'
              value={address}
              onChange={handleInputChange}
              className='w-full rounded border px-4 py-2'
            />
          </div>
        </div>

        {/* 주문 상품 */}
        <div className='mb-9 rounded-2xl border border-gray-200 px-6 py-4'>
          <h2 className='mb-4 text-lg font-bold'>🛒 주문상품</h2>
          {data?.map((item) => (
            <div
              key={item.id}
              className='flex items-center gap-4 border-b py-4 last:border-b-0'
            >
              <img
                src={item.imgUrl[0] || '/basicPicture.png'}
                alt='상품 이미지'
                className='h-20 w-20 rounded object-cover'
              />
              <div className='flex-1'>
                <p className='mb-1 font-semibold text-gray-800'>{item.name}</p>
                <p className='text-sm text-gray-500'>수량: {item.quantity}개</p>
              </div>
              <div className='text-right font-semibold text-gray-800'>
                {(item.price * item.quantity).toLocaleString()}원
              </div>
            </div>
          ))}
        </div>

        <div className='mb-7 max-w-xl overflow-hidden rounded-2xl border border-gray-200 shadow-sm'>
          <div className='flex items-center justify-between px-6 py-4'>
            <h2>배송비</h2>
            <div className='font-bold'>3,000 원</div>
          </div>
          <div className='flex items-center justify-between bg-green-50 px-6 py-4'>
            <h2 className='mb-1 text-lg font-bold'>총 주문금액</h2>
            <div className='text-lg font-bold text-green-600'>
              {totalPrice.toLocaleString()} 원
            </div>
          </div>
        </div>

        {/* 결제 버튼 */}
        <div className='space-y-3 text-center'>
          <label className='mb-2 flex items-center justify-center gap-2 text-sm text-gray-600'>
            <input
              type='checkbox'
              checked={agree}
              onChange={() => setAgree(!agree)}
              className='accent-green-600'
            />
            주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
          </label>
          <button
            onClick={handlePayment}
            className={`w-full rounded bg-green-500 py-3 text-lg font-bold text-white ${
              agree ? 'hover:bg-green-600' : 'cursor-not-allowed opacity-50'
            }`}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  )
}
