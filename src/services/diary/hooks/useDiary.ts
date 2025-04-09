import { useState } from 'react'

export const useDiary = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleChangeSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return { searchQuery, handleChangeSearchQuery }
}
