import { FaCamera } from 'react-icons/fa'

interface ImgUploadProps {
  petImg: string | null
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ImgUpload = ({ petImg, handleImageUpload }: ImgUploadProps) => {
  return (
    <div className='mb-6'>
      <div className='flex w-full flex-col items-center'>
        <label className='flex h-32 w-32 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-gray-50'>
          {petImg ? (
            <img
              src={petImg}
              alt='pet preview'
              className='h-full w-full rounded-full object-cover'
            />
          ) : (
            <FaCamera className='text-2xl text-gray-400' />
          )}
          <input type='file' className='hidden' onChange={handleImageUpload} />
        </label>
      </div>
    </div>
  )
}
