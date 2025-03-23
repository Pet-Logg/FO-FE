import clsx from 'clsx'

interface DeleteButtonProps {
  text: string
  type: string
  onClick: () => void
  disabled?: boolean
}

const Button: React.FC<DeleteButtonProps> = ({
  text,
  type,
  onClick,
  disabled
}) => {
  const buttonClass = clsx(
    'flex items-center justify-center rounded-full px-4 py-2 font-semibold text-white shadow-md transition',
    {
      'bg-red-400 hover:bg-red-500': type === 'delete',
      'bg-gray-400 hover:bg-gray-500': type === 'cancel',
      'bg-blue-400 hover:bg-blue-500': type === 'normal',
      'cursor-not-allowed bg-gray-300 opacity-50': disabled
    }
  )

  return (
    <button onClick={onClick} className={buttonClass}>
      {text}
    </button>
  )
}

export default Button
