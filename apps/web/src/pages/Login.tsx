import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      alert(error.message)
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <div>
        <Header/>
        <form className='p-4 max-w-sm mx-auto'
          onSubmit={(e) => {
            e.preventDefault(); // prevent page reload
            handleLogin();      // call your login logic
          }}
          >
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-2 rounded text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 rounded text-black"
          />
          <button
            type="submit" // 🔑 This makes the button trigger when hitting Enter
            className="w-full p-2 rounded"
          >
            Login
          </button>
        </form>
    </div>
  )
}
