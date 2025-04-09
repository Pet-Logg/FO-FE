import { CartItemList } from '@/components/cart/CartItemList'
import { CartSummary } from '@/components/cart/CartSummary'
import { OrderProgress } from '@/components/cart/OrderProgress'
import {
  calculateTotal,
  useCart,
  useDeleteCart,
  useGetCart,
  useUpdateCart
} from '@/services/cart'

export const Carts = () => {
  const { data: cartItems = [] } = useGetCart()
  const deleteCartMutate = useDeleteCart()
  const updateCartMutate = useUpdateCart()
  const { selectedItems, setSelectedItems, toggleSelectAll, toggleSelectItem } =
    useCart(cartItems)
  const deliveryFee = 3000 // 배송비

  // 수량 증감 버튼
  const updateQuantityBtn = (id: number, amount: number) => {
    const currentItem = cartItems.find((item) => item.id === id)
    if (!currentItem) return

    const newQuantity = Math.max(1, currentItem.quantity + amount)

    updateCartMutate.mutate(
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

    deleteCartMutate.mutate(
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

  // 총 금액 계산
  const { total } = calculateTotal(selectedItems, cartItems)
  const grandTotal = total + deliveryFee

  // 상품이 하나도 없을 경우 전체선택이 안되도록
  const isAllSelected =
    cartItems.length > 0 && selectedItems.length === cartItems.length

  return (
    <div className='mx-auto min-h-[800px] w-[1050px] py-12'>
      {/* 단계 표시 */}
      <OrderProgress currentStep={1} />

      <h1 className='mb-8 text-3xl font-bold'>장바구니</h1>

      {/* 장바구니 테이블 */}
      <CartItemList
        isAllSelected={isAllSelected}
        toggleSelectAll={toggleSelectAll}
        cartItems={cartItems}
        selectedItems={selectedItems}
        toggleSelectItem={toggleSelectItem}
        updateQuantityBtn={updateQuantityBtn}
      />

      {/* 선택 삭제 버튼 */}
      <div className='mt-6 flex items-start justify-between'>
        <button
          onClick={deleteSelectedItemsBtn}
          className='rounded border border-gray-400 px-4 py-2 hover:bg-gray-100'
        >
          선택 삭제
        </button>

        {/* 총 결제 금액 요약 */}
        <CartSummary
          total={total}
          deliveryFee={deliveryFee}
          grandTotal={grandTotal}
        />
      </div>
    </div>
  )
}
