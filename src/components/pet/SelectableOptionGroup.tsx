import { PetData } from '@/types/PetData'
import { OptionButton } from './OptionButton'

interface SelectableOptionGroupProps {
  title: string
  type: 'disease' | 'allergy'
  options: string[]
  hasOption: boolean | null
  setHasOption: (value: boolean) => void
  petData: PetData
  setPetData: React.Dispatch<React.SetStateAction<PetData>>
  handleSelectOption: (type: 'disease' | 'allergy', value: string) => void
}

export const SelectableOptionGroup = ({
  title,
  type,
  options,
  hasOption,
  setHasOption,
  petData,
  setPetData,
  handleSelectOption
}: SelectableOptionGroupProps) => {
  return (
    <div className='mb-9 flex w-full flex-col'>
      <div className='mb-2 font-bold'>{title}</div>
      <div className='flex w-full gap-3'>
        <button
          type='button'
          className={`flex-1 rounded-md border py-2 ${
            hasOption === true ? 'bg-orange-100' : ''
          }`}
          onClick={() => setHasOption(true)}
        >
          있어요
        </button>
        <button
          type='button'
          className={`flex-1 rounded-md border py-2 ${
            hasOption === false ? 'bg-orange-100' : ''
          }`}
          onClick={() => {
            setHasOption(false)
            setPetData((prev) => ({ ...prev, [type]: [] }))
          }}
        >
          없어요
        </button>
      </div>
      <div>
        {hasOption && (
          <div className='mt-2 flex flex-wrap gap-2'>
            <OptionButton
              petData={petData}
              type={type}
              options={options}
              handleSelectOption={handleSelectOption}
            />
          </div>
        )}
      </div>
    </div>
  )
}
