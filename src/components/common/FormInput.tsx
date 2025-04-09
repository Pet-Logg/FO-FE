interface FormInputProps {
  title: string
  type: 'email' | 'password'
  name: string
  required?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormInput = ({
  title,
  type,
  name,
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
        name={name}
        className='w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none'
        required={required}
        onChange={onChange}
      />
    </div>
  )
}
