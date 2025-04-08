interface ChangePasswordInputProps {
  label: string
  name: string
  placeholder: string
  password: string
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const ChangePasswordInput = ({
  label,
  name,
  placeholder,
  password,
  onChangeInput
}: ChangePasswordInputProps) => {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center'>
        <label className='mr-[80px] w-[220px] font-medium'>{label}</label>
        <input
          type='password'
          name={name}
          placeholder={placeholder}
          className='w-full rounded-md border border-gray-300 p-3 text-sm placeholder-gray-500 focus:border-gray-600 focus:outline-none focus:ring-0'
          value={password}
          onChange={onChangeInput}
        />
      </div>
    </div>
  )
}
