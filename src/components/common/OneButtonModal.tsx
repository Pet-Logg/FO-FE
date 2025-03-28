import { Button } from './Button'

interface PopupProps {
  text: string
  buttonName: string
  buttonType: string
  onConfirm: () => void
}

export const OneButtonModal: React.FC<PopupProps> = ({
  text,
  buttonName,
  buttonType,
  onConfirm
}) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-40'>
      <div className='relative w-80 rounded-lg bg-white p-8 shadow-lg'>
        <p className='mb-5 text-center text-xl font-bold'>{text}</p>
        <div className='flex justify-around pt-3'>
          <Button text={buttonName} type={buttonType} onClick={onConfirm} />
        </div>
      </div>
    </div>
  )
}
