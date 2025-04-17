import { useState } from 'react'

export const useOrder = () => {
  const [formValues, setFormValues] = useState({
    receiver: '',
    phone: '',
    address: ''
  })
  const { receiver, phone, address } = formValues
  const [agree, setAgree] = useState(false)

  const handlePayment = () => {
    if (!receiver || !phone || !address || !agree) {
      alert('모든 정보를 입력하고 동의해주세요.')
      return
    }

    alert('결제 페이지로 이동합니다.')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  return {
    receiver,
    phone,
    address,
    agree,
    setAgree,
    handlePayment,
    handleInputChange
  }
}
