import { useState } from 'react'

export const useOrder = () => {
  const [formValues, setFormValues] = useState({
    recipient: '',
    phone: '',
    address: ''
  })
  const { recipient, phone, address } = formValues
  const [agree, setAgree] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return {
    recipient,
    phone,
    address,
    agree,
    setAgree,
    handleInputChange
  }
}
