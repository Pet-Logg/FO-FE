import { ProductHeader } from '@/components/product'
import { useGetAllProduct } from '@/services/product'
import { getFirstImage } from '@/utils/getFirstImage'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUserRole } from '../utils/getUserRole'

// 첫 번째 이미지를 가져오는 함수
export const Products = () => {
  const { data, isLoading, isError } = useGetAllProduct()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const role = getUserRole()

    if (role === 'ADMIN') {
      setIsAdmin(true)
    }
  }, [data])

  if (isLoading) {
    return <div className='mx-auto min-h-[800px] w-[1050px] py-14'>로딩 중</div>
  }

  if (isError) {
    return (
      <div className='mx-auto min-h-[800px] w-[1050px] py-14'>
        페이지를 불러오는 도중 에러가 발생했습니다.
      </div>
    )
  }

  return (
    <div className='mx-auto min-h-[800px] w-[1050px] py-20'>
      <ProductHeader isAdmin={isAdmin} />

      <div className='grid grid-cols-3 gap-8'>
        {data?.map((product) => (
          <Link
            key={product.productId}
            to={`/${product.productId}`}
            className='rounded-lg p-4'
          >
            <img
              src={getFirstImage(product.imgUrl)}
              alt={product.name}
              className='h-64 w-full rounded-md object-cover'
            />
            <h3 className='mt-4 text-center text-lg font-bold'>
              {product.name}
            </h3>
            <p className='text-center text-xl font-bold text-yellow-600'>
              {product.price.toLocaleString()}원
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
