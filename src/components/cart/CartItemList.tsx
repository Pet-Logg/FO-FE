import { GetCartResponse } from '@/services/cart'
import logo from '@/assets/logo.png'

interface DiaryHeaderPrpos {
  isAllSelected: boolean
  toggleSelectAll: () => void
  cartItems: GetCartResponse[]
  selectedItems: number[]
  toggleSelectItem: (id: number) => void
  updateQuantityBtn: (id: number, amount: number) => void
}

export const CartItemList = ({
  isAllSelected,
  toggleSelectAll,
  cartItems,
  selectedItems,
  toggleSelectItem,
  updateQuantityBtn
}: DiaryHeaderPrpos) => {
  return (
    <div className='border-t border-gray-300'>
      <table className='w-full table-fixed text-center'>
        <thead className='border-b border-gray-300 bg-gray-100'>
          <tr>
            <th className='w-[8%] p-3'>
              <input
                type='checkbox'
                checked={isAllSelected}
                onChange={toggleSelectAll}
              />
            </th>
            <th className='w-[42%] p-3'>상품명</th>
            <th className='w-[15%] p-3'>상품금액</th>
            <th className='w-[15%] p-3'>수량</th>
            <th className='w-[20% p-3'>합계금액</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              const subtotal = item.price * item.quantity

              return (
                <tr key={item.id} className='border-b'>
                  <td className='p-3'>
                    <input
                      type='checkbox'
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                    />
                  </td>
                  <td className='flex items-center gap-4 py-3 pl-6 pr-3'>
                    <img src={item.imgUrl[0] || logo} className='h-12' />
                    <div>{item.name}</div>
                  </td>
                  <td className='p-3'>{item.price.toLocaleString()}원</td>
                  <td className='p-3'>
                    <div className='flex items-center justify-center space-x-2'>
                      <button
                        onClick={() => updateQuantityBtn(item.id, -1)}
                        className='rounded border px-2 hover:bg-gray-100'
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantityBtn(item.id, 1)}
                        className='rounded border px-2 hover:bg-gray-100'
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className='p-3'>{subtotal.toLocaleString()}원</td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td
                colSpan={5}
                className='border-b py-10 text-center text-gray-500'
              >
                장바구니에 상품을 추가해주세요.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
