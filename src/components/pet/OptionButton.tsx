import { PetData } from '@/types/PetData'

interface OptionButtonProps {
  petData: PetData
  type: 'disease' | 'allergy'
  options: string[] | null
  handleSelectOption: (type: 'disease' | 'allergy', value: string) => void
}

export const OptionButton = ({
  petData,
  type,
  options,
  handleSelectOption
}: OptionButtonProps) => {
  return (
    <div className='mt-2 flex flex-wrap gap-2'>
      {options?.map((option) => (
        <button
          key={option}
          type='button'
          className={`rounded-md border px-4 py-2 ${
            petData[type]?.includes(option)
              ? 'bg-blue-100 font-bold text-blue-800'
              : 'bg-white'
          }`}
          onClick={() => handleSelectOption(type, option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
