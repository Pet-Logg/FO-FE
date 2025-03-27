interface FormInputProps {
  title: string
  type: 'email' | 'password'
  required?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormInput = ({
  title,
  type,
  required = false,
  onChange
}: FormInputProps) => {
  return (
    <div className='mb-4'>
      <label className='mb-2 block text-sm font-bold text-gray-700'>
        {title}
      </label>
      <input
        type={type}
        className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none'
        required={required}
        onChange={onChange}
      />
    </div>
  )
}
