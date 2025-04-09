interface ContentProps {
  titleValue: string | undefined
  contentValue: string | undefined
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
}
export const Content = ({
  titleValue,
  contentValue,
  handleInputChange
}: ContentProps) => {
  return (
    <div className='flex items-center justify-center'>
      <div className='h-[500px] w-3/4 rounded-2xl border border-gray-300 px-6 py-6'>
        <div className='border-b border-gray-300'>
          <input
            type='text'
            placeholder='제목을 입력하세요.'
            className='mb-4 size-full h-8 text-2xl focus:outline-none'
            name='title'
            value={titleValue}
            onChange={handleInputChange}
          />
        </div>
        <div className='h-[388px] w-full'>
          <textarea
            placeholder='내용을 입력하세요.'
            className='mt-4 h-full w-full resize-none focus:outline-none'
            name='content'
            value={contentValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  )
}
