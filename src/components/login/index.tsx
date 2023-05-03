import useLogin from '@src/hooks/useLogin'
import { useRef } from 'react'
import { Button, Input } from "semantic-ui-react"

const Login = () => {
  const formRef = useRef<HTMLInputElement>()
  const { handleSubmit, onUsernameChange, onPasswordChange } = useLogin()

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <form className='flex flex-col gap-4' ref={formRef}>
        <Input placeholder='Username' onChange={onUsernameChange} />
        <Input placeholder='Password' type='password' onChange={onPasswordChange} />
        <Button primary onClick={handleSubmit}>Log in</Button>
      </form>
    </div>
  )
}
export default Login