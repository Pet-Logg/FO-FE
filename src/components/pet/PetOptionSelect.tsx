interface PetOptionSelecteProps {
  label: string
  name: string
  petData: string | null | undefined
  options: { value: string; text: string }[]
  onSelect: (value: string) => void
}

export const PetOptionSelect = ({
  label,
  name,
  petData,
  options,
  onSelect
}: PetOptionSelecteProps) => {
  return (
    <div className='mb-9 flex w-full flex-col'>
      <div className='flex gap-1 font-bold'>
        <div className='mb-2'>{label}</div>
        <div className='text-sm text-red-600'>*</div>
      </div>
      <div className='flex w-full gap-3'>
        {options.map(({ value, text }) => (
          <button
            name={name}
            type='button'
            className={`flex-1 rounded-md border py-2 ${
              petData === value ? 'bg-orange-100' : ''
            }`}
            onClick={() => onSelect(value)}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  )
}
