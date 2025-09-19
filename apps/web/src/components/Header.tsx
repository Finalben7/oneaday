import { useNavigate } from 'react-router-dom'
import { useUser } from '@supabase/auth-helpers-react'
import { supabase } from '../supabaseClient'
import logo from '../assets/one-a-day-no-bg.png'

const Header = () => {
  const navigate = useNavigate()
  const user = useUser()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/') // Optional: go to home after logout
  }

  const handleLogoClick = () => {
    navigate(user ? '/dashboard' : '/')
  }

return (
  <header className="flex justify-between items-center p-4">
    <div className="flex items-center space-x-3">
      <img
        src={logo}
        alt="One a day logo"
        className="w-16 h-16 rounded hover:cursor-pointer"
        onClick={handleLogoClick}
      />
      <h1
        className="text-xl font-bold hover:cursor-pointer"
        onClick={handleLogoClick}
      >
        One A Day
      </h1>
    </div>

    <div className="flex items-center space-x-4">
      {user ? (
        <button className="px-4 py-2" onClick={handleLogout}>
          Log Out
        </button>
      ) : (
        <>
          <button
            className="px-4 py-2"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="px-4 py-2"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </>
      )}
    </div>
  </header>
)
}

export default Header