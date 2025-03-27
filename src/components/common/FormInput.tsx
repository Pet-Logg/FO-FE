interface FormInputProps {
  label: string
  type: 'email' | 'password'
  required?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormInput = ({
  label,
  type,
  required = false,
  onChange
}: FormInputProps) => {
  return (
    <div className='mb-4'>
      <label className='mb-2 block text-sm font-bold text-gray-700'>
        {label}
      </label>
      <input
        type={type}
        className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-300 focus:outline-none focus:ring'
        required={required}
        onChange={onChange}
      />
    </div>
  )
}
