import { useState } from 'react'
import { supabase } from '../supabaseClient'
import Header from '../components/Header'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      alert(error.message)
    } else {
      alert('Logged in!')
    }
  }

  return (
    <div>
        <Header/>
        <div className="p-4 max-w-sm mx-auto text-white">
        <h2>Log In</h2>
        <input
            className="w-full p-2 mb-2 rounded text-black"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
        <input
            className="w-full p-2 mb-4 rounded text-black"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button
            className="w-full p-2 rounded"
            onClick={handleLogin}
        >
            Log In
        </button>
        </div>
    </div>
  )
}
