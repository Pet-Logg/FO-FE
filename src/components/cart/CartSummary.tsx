interface DCartSummaryPrpos {
  total: number
  deliveryFee: number
  grandTotal: number
}

export const CartSummary = ({
  total,
  deliveryFee,
  grandTotal
}: DCartSummaryPrpos) => {
  return (
    <div className='w-72 rounded bg-gray-50 p-4 text-right'>
      <div className='mb-1 flex justify-between'>
        <span>상품 합계</span>
        <span>{total.toLocaleString()}원</span>
      </div>
      <div className='mb-1 flex justify-between'>
        <span>배송비</span>
        <span>{deliveryFee.toLocaleString()}원</span>
      </div>
      <div className='mt-2 flex justify-between border-t pt-2 text-lg font-bold'>
        <span>총 결제 금액</span>
        <span>{grandTotal.toLocaleString()}원</span>
      </div>
    </div>
  )
}
