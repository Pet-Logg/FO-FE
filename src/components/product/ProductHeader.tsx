import { Link } from 'react-router-dom'

interface ProductHeaderPrpos {
  isAdmin: boolean
}

export const ProductHeader = ({ isAdmin }: ProductHeaderPrpos) => {
  return (
    <div>
      <h2 className='mb-8 text-2xl font-bold'>상품 목록</h2>
      {isAdmin && (
        <div className='mb-5 flex justify-end'>
          <Link
            to='/createProduct'
            className='rounded-full bg-blue-400 px-4 py-2 text-white hover:bg-blue-500'
          >
            상품 등록
          </Link>
        </div>
      )}
    </div>
  )
}
