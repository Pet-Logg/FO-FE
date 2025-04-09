import { ProductHeader } from '@/components/product'
import { useGetAllProduct } from '@/services/product'
import { useProducts } from '@/services/product/hooks'
import { getFirstImage } from '@/utils/getFirstImage'
import { Link } from 'react-router-dom'

export const Products = () => {
  const { data, isLoading, isError, error } = useGetAllProduct()
  const { isAdmin } = useProducts(data)

  if (isLoading)
    return (
      <p className='mx-auto flex min-h-[750px] w-[1050px] items-center justify-center text-3xl'>
        ⏳ 로딩 중...
      </p>
    )

  if (isError)
    return (
      <p className='mx-auto flex min-h-[750px] w-[1050px] items-center justify-center text-3xl text-red-500'>
        {error.message}
      </p>
    )

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
