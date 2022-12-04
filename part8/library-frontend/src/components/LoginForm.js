import { useMutation } from "@apollo/client"
import { useEffect, useState } from "react"
import { LOGIN } from "../queries"

const LoginForm = ({ show, setError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('user-token', token)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data])

  if (!show) {
    return null
  }

  const handleLogin = (event) => {
    event.preventDefault()

    login({ variables: { username, password } })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <div>
          name
          <input value={username} onChange={ ({ target }) => {setUsername(target.value)} }>
          </input>
        </div>
        <div>
          password
          <input value={password} type='password' onChange={ ({ target }) => {setPassword(target.value)} }>
          </input>
        </div>
        <button>login</button>
      </div>
    </form>
  )
}

export default LoginForm
