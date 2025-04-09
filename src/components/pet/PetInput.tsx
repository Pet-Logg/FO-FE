interface PetInputProps {
  label: string
  name: string
  type?: 'text' | 'number' | 'date'
  description?: string
  value: string | number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const PetInput = ({
  label,
  name,
  type = 'text',
  description,
  value,
  onChange
}: PetInputProps) => {
  const today: string = new Date().toISOString().split('T')[0]

  const renderInput = () => {
    switch (type) {
      case 'text':
        return (
          <input
            name={name}
            type='text'
            value={value}
            onChange={onChange}
            required
            className='w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none'
          />
        )
      case 'number':
        return (
          <>
            <input
              name={name}
              type='number'
              min='0'
              step='0.01'
              value={value === 0 ? '' : value}
              onChange={onChange}
              required
              className='w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none'
            />
            <span className='absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-700'>
              kg
            </span>
          </>
        )
      case 'date':
        return (
          <input
            name={name}
            type='date'
            value={value}
            onChange={onChange}
            required
            max={today}
            className='w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none'
          />
        )
      default:
        return null
    }
  }

  return (
    <div className='mb-9'>
      <div className='flex items-start gap-1 font-bold'>
        <div className='mb-2'>{label}</div>
        <div className='text-sm text-red-600'>*</div>
      </div>

      {description && (
        <p className='mb-2 text-xs text-gray-500'>{description}</p>
      )}

      <div className='relative flex w-full'>{renderInput()}</div>
    </div>
  )
}
