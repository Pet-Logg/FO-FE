import { useState } from 'react'

export const useSignupForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  return { form, handleInputChange }
}
