interface ProductInputProps {
  label: string
  name: string
  type?: 'text' | 'number'
  value: string | number
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ProductInput = ({
  label,
  name,
  type = 'text',
  value,
  handleInputChange
}: ProductInputProps) => {
  return (
    <div className='mb-8'>
      <div className='mb-2 flex items-start gap-1 font-bold'>
        <div>{label}</div>
        <div className='text-sm text-red-600'>*</div>
      </div>
      <input
        name={name}
        type={type}
        value={value}
        onChange={handleInputChange}
        required
        className='w-full rounded-md border border-gray-200 px-3 py-2 focus:border-blue-300'
      />
    </div>
  )
}
