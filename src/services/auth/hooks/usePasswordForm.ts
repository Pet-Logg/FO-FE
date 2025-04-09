import { useState } from 'react'
import { ChangePasswordRequest } from '../types'

type ChangePasswordForm = ChangePasswordRequest & { confirmPassword: string }

export const usePasswordFrom = () => {
  const [passwordError, setPasswordError] = useState('') // 비밀번호 길이 오류
  const [isDisabled, setIsDisabled] = useState(true)
  const [formValues, setFormValues] = useState<ChangePasswordForm>({
    password: '',
    confirmPassword: ''
  })

  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*?_])[A-Za-z\d!@#$%^&*?_]{8,16}$/

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const updatedFormValues = { ...formValues, [name]: value }
    setFormValues(updatedFormValues)
    let passwordErr = ''

    // 비밀번호 정규식 검사
    if (name === 'password') {
      if (!passwordPattern.test(value) && value.length > 0) {
        passwordErr =
          '비밀번호는 8~16자, 영문, 숫자, 특수문자를 포함해야 합니다.'
        setPasswordError(passwordErr)
        return
      }
    }

    // 입력이 비어 있으면 오류 메시지 초기화
    if (value.length === 0) {
      setPasswordError('')
    }

    // 비밀번호 일치 검사
    if (name === 'confirmPassword' && value !== updatedFormValues.password) {
      passwordErr = '비밀번호가 일치하지 않습니다.'
      setPasswordError(passwordErr)
      return
    }

    // 버튼 활성화
    setIsDisabled(
      !!(
        passwordErr ||
        !updatedFormValues.password ||
        !updatedFormValues.confirmPassword
      )
    )
  }

  return {
    passwordError,
    setPasswordError,
    isDisabled,
    setIsDisabled,
    formValues,
    setFormValues,
    passwordPattern,
    handleInputChange
  }
}
