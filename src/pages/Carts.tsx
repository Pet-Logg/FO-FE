import { useUpdateWishList } from '@/services/wishList'
import { useDeleteWishList } from '@/services/wishList/queries/useDeleteWishList'
import { useGetWishList } from '@/services/wishList/queries/useGetWishList'
import { useState } from 'react'
import logo from '../assets/logo.png'

export const Carts = () => {
  const { data: cartItems = [] } = useGetWishList()
  const deleteWishListMutate = useDeleteWishList()
  const updateWishListMutate = useUpdateWishList()
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const deliveryFee = 3000 // 배송비

  // 전체 선택 체크 박스
  const toggleSelectAll = () => {
    if (selectedItems.length === cartItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(cartItems.map((item) => item.id))
    }
  }

  // 상품 하나 체크 박스
  const toggleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    )
  }

  // 수량 증감 버튼
  const updateQuantityBtn = (id: number, amount: number) => {
    const currentItem = cartItems.find((item) => item.id === id)
    if (!currentItem) return

    const newQuantity = Math.max(1, currentItem.quantity + amount)

    updateWishListMutate.mutate(
      {
        productId: currentItem.productId,
        quantity: newQuantity
      },
      {
        onSuccess: () => {
          console.log('수량이 변경되었습니다.')
        },
        onError: () => {
          alert('수량 변경 중 오류가 발생했습니다.')
        }
      }
    )
  }

  // 선택 삭제 버튼
  const deleteSelectedItemsBtn = () => {
    if (selectedItems.length === 0) return

    deleteWishListMutate.mutate(
      { selectedItems },
      {
        onSuccess: () => {
          console.log('선택한 장바구니 항목이 삭제되었습니다.')
          setSelectedItems([])
        },
        onError: () => {
          alert('삭제 중 오류가 발생했습니다.')
        }
      }
    )
  }

  // 총 결제금액 계산
  const calculateTotal = () => {
    return cartItems
      .filter((item) => selectedItems.includes(item.id))
      .reduce(
        (acc, item) => {
          const subtotal = item.price * item.quantity
          return {
            total: acc.total + subtotal
          }
        },
        { total: 0 }
      )
  }

  // 총 금액 계산
  const { total } = calculateTotal()
  const grandTotal = total + deliveryFee

  // 상품이 하나도 없을 경우 전체선택이 안되도록
  const isAllSelected =
    cartItems.length > 0 && selectedItems.length === cartItems.length

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
                <input
                  type='checkbox'
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                />
              </th>
              <th className='p-3'>상품명</th>
              <th className='p-3'>상품금액</th>
              <th className='p-3'>수량</th>
              <th className='p-3'>합계금액</th>
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
                      <div className='font-medium'>{item.name}</div>
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

      {/* 선택 삭제 버튼 */}
      <div className='mt-6 flex items-start justify-between'>
        <button
          onClick={deleteSelectedItemsBtn}
          className='rounded border border-gray-400 px-4 py-2 hover:bg-gray-100'
        >
          선택 삭제
        </button>

        {/* 총 결제 금액 요약 */}
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
      </div>
    </div>
  )
}
