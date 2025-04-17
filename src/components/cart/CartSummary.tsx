interface DCartSummaryPrpos {
  total: number
  deliveryFee: number
  grandTotal: number
  productCount: number
  onOrderClick: () => void
}

export const CartSummary = ({
  total,
  deliveryFee,
  grandTotal,
  productCount,
  onOrderClick
}: DCartSummaryPrpos) => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-6 text-sm font-semibold'>
        <div className='text-center'>
          <div>선택상품금액</div>
          <div className='text-lg font-bold'>{total.toLocaleString()}원</div>
        </div>
        <span className='text-xl'>+</span>
        <div className='text-center'>
          <div>총 배송비</div>
          <div className='text-lg font-bold'>
            {deliveryFee.toLocaleString()}원
          </div>
        </div>
        <div className='mx-2 h-10 border-l border-gray-300' />
        <div className='text-center text-green-600'>
          <div>주문금액</div>
          <div className='text-xl font-bold'>
            {grandTotal.toLocaleString()}원
          </div>
        </div>
      </div>

      <button
        onClick={onOrderClick}
        disabled={productCount === 0}
        className={`ml-8 rounded bg-green-600 px-6 py-3 font-semibold text-white ${
          productCount === 0
            ? 'cursor-not-allowed opacity-50'
            : 'hover:bg-green-700'
        }`}
      >
        {`주문하기`}
      </button>
    </div>
  )
}
