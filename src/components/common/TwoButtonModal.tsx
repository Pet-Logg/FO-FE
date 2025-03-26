import Button from './Button'

interface PopupProps {
  text: string
  subText: string
  firstButton: string
  secondButton: string
  firstType: string
  secondType: string
  onConfirm: () => void
  onCancle: () => void
}

const TwoButtonModal: React.FC<PopupProps> = ({
  text,
  subText,
  firstButton,
  secondButton,
  firstType,
  secondType,
  onConfirm,
  onCancle
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40'>
      <div className='relative w-80 rounded-lg bg-white p-8 shadow-lg'>
        <p className='mb-1 text-center text-xl font-bold'>{text}</p>
        <p className='mb-5 text-center text-sm text-gray-500'>{subText}</p>
        <div className='flex justify-around pt-3'>
          <Button text={firstButton} type={firstType} onClick={onConfirm} />
          <Button text={secondButton} type={secondType} onClick={onCancle} />
        </div>
      </div>
    </div>
  )
}

export default TwoButtonModal
