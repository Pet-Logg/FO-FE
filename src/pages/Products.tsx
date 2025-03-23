import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/auth' // 백엔드 API 호출 함수
import Button from '../components/Button'
import { ProductData } from '../types/ProductData'
import { getUserRole } from '../utils/getUserRole'

// 첫 번째 이미지를 가져오는 함수
const getFirstImage = (imgUrls: string[] | string): string => {
  if (Array.isArray(imgUrls) && imgUrls.length > 0) {
    return imgUrls[0] // 배열이면 첫 번째 이미지 반환
  }
  return imgUrls[0] ?? '' // 배열이 아니면 그대로 반환, 없으면 빈 문자열 반환
}

const Products = () => {
  const [products, setProducts] = useState<ProductData[]>([])
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts() // 백엔드 API에서 상품 데이터 가져오기
        setProducts(data)
      } catch (error) {
        console.error('상품 목록을 불러오는 중 오류 발생:', error)
      }
    }

    fetchProducts()

    const role = getUserRole()

    if (role === 'ADMIN') {
      setIsAdmin(true)
    }
  }, [])

  return (
    <div className='mx-auto min-h-[600px] w-[1050px] py-12'>
      <h2 className='mb-10 text-2xl font-bold'>상품 목록</h2>
      {isAdmin && (
        <Link to={'/createProduct'} className='mb-5 flex justify-end'>
          <Button text={'상품 등록'} type={'normal'} onClick={() => {}} />
        </Link>
      )}
      <div className='grid grid-cols-4 gap-8'>
        {products.map((product) => (
          <Link to={`/${product.productId}`}>
            <div key={product.productId} className='rounded-lg border p-4'>
              <img
                src={getFirstImage(product.imgUrl)}
                alt={product.name}
                className='h-64 w-full rounded-md object-cover'
              />
              <h3 className='mt-2 text-lg font-semibold'>{product.name}</h3>
              <p className='text-xl font-bold'>
                {product.price.toLocaleString()}원
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Products
