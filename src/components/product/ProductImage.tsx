interface ProductImgProps {
  mainImage: string
  imageList: string[]
  onMouseEnterEvt: (img: string) => void
}

export const ProductImg = ({
  mainImage,
  imageList,
  onMouseEnterEvt
}: ProductImgProps) => {
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
