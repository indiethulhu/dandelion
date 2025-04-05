import { useState } from 'react'
import { useSessionStore } from '../stores/session'

const Login = () => {
  const [email, setEmail] = useState('')
  const login = useSessionStore(state => state.login)

  const handleLogin = () => {
    login('fake-jwt-token-for-now')
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="you@dandelion"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
    </div>
  )
}

export default Login
