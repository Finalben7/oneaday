import { useState } from 'react'
import { supabase } from '../supabaseClient'
import Header from '../components/Header'

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          display_name: displayName
        },
        emailRedirectTo: `${window.location.origin}/dashboard`
      },
     });

    if (error) {
      alert(error.message)
    } else {
      alert('Check your email to confirm your sign-up.')
    }
  }

  return (
    <div>
      <Header/>
      <form className='p-4 max-w-sm mx-auto'
          onSubmit={(e) => {
            e.preventDefault(); // prevent page reload
            handleSignUp();      // call your login logic
        }}
        >
        <h2>Sign Up</h2>
        <input
          className="w-full p-2 mb-2 rounded text-black"
          type="text"
          placeholder="Username"
          required
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
        <input
          className="w-full p-2 mb-2 rounded text-black"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-2 mb-4 rounded text-black"
          placeholder="Password"
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full p-2 rounded"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}
