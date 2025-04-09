interface ProductImgProps {
  mainImage: string
  imgUrl: string | undefined
  onMouseEnterEvt: (img: string) => void
}

export const ProductImg = ({
  mainImage,
  imgUrl,
  onMouseEnterEvt
}: ProductImgProps) => {
  // 이미지 리스트로 변경
  const imageList = Array.isArray(imgUrl) ? imgUrl : imgUrl ? [imgUrl] : []

  return (
    <div className='w-[450px]'>
      <div className='mb-3 overflow-hidden rounded-lg border'>
        {mainImage && (
          <img src={mainImage} alt='대표 이미지' className='h-[450px] w-full' />
        )}
      </div>

      <div className='flex justify-center gap-2'>
        {imageList.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`img-${idx}`}
            onMouseEnter={() => onMouseEnterEvt(img)}
            className='h-20 w-20 cursor-pointer rounded-md border object-cover hover:border-blue-500'
          />
        ))}
      </div>
    </div>
  )
}
