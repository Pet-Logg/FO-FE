interface ContentProps {
  name: string
  price: number
  quantity: number
  handleQuantityChange: (type: 'increase' | 'decrease') => void
}

export const Content = ({
  name,
  price,
  quantity,
  handleQuantityChange
}: ContentProps) => {
  const totalPrice = (price ?? 0) * quantity // 총가격

  return (
    <>
      <h1 className='mb-3 text-2xl font-bold'>{name}</h1>
      <p className='mb-6 text-2xl font-bold text-red-600'>
        {price.toLocaleString()}원
      </p>

      <div className='mb-6 rounded-md bg-gray-50 p-4'>
        <div className='mb-2 font-medium'>{name}</div>
        <div className='flex items-center justify-between'>
          <div className='flex items-center rounded-md border'>
            <button
              onClick={() => handleQuantityChange('decrease')}
              className='px-3 py-1 text-lg'
            >
              −
            </button>
            <div className='w-10 text-center'>{quantity}</div>
            <button
              onClick={() => handleQuantityChange('increase')}
              className='px-3 py-1 text-lg'
            >
              +
            </button>
          </div>
          <div className='text-lg font-bold'>
            {totalPrice.toLocaleString()}원
          </div>
        </div>
      </div>

      <div className='mb-6 text-xl font-bold'>
        총 상품금액{' '}
        <span className='text-red-600'>{totalPrice.toLocaleString()}원</span>
      </div>
    </>
  )
}
