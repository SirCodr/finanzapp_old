import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SHA256 } from 'crypto-js'

const useLogin = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSubmit = (e : React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('user-token', '123')
    navigate('/')   
  }

  const onUsernameChange = (e: React.SyntheticEvent) => {    
    const value = e.target?.value
    setUsername(value)
    const a = SHA256(value).toString()
    console.log(a);
  }

  const onPasswordChange = (e:React.SyntheticEvent) => {
    const value = e.target?.value
    setPassword(value)
  }

  return { handleSubmit, onUsernameChange, onPasswordChange }
}
export default useLogin