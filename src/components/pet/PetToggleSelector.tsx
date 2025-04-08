interface ToggleSelectorProps {
  label: string
  name: 'disease' | 'allergy'
  hasOption: boolean | null
  options: string[]
  selectedOptions: string[]
  onToggle: (hasOption: boolean) => void
  onSelect: (value: string) => void
}

export const ToggleSelector = ({
  label,
  hasOption,
  options,
  selectedOptions,
  onToggle,
  onSelect
}: ToggleSelectorProps) => {
  return (
    <div className='mb-9 flex w-full flex-col'>
      <div className='mb-2 font-bold'>{label}</div>

      <div className='flex w-full gap-3'>
        <button
          type='button'
          className={`flex-1 rounded-md border py-2 ${
            hasOption === true ? 'bg-orange-100' : ''
          }`}
          onClick={() => onToggle(true)}
        >
          있어요
        </button>
        <button
          type='button'
          className={`flex-1 rounded-md border py-2 ${
            hasOption === false ? 'bg-orange-100' : ''
          }`}
          onClick={() => onToggle(false)}
        >
          없어요
        </button>
      </div>

      {hasOption && (
        <div className='mt-2 flex flex-wrap gap-2'>
          {options.map((option) => (
            <button
              type='button'
              key={option}
              className={`rounded-md border px-4 py-2 ${
                selectedOptions.includes(option)
                  ? 'bg-blue-100 font-bold text-white'
                  : ''
              }`}
              onClick={() => onSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
