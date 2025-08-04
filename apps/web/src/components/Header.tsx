import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/'); // optional: go to home after logout
  };

  const handleLogoClick = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/')
    }
  }

  return (

    <header className="flex justify-between items-center p-4">
      <h1 className="text-xl font-bold hover:cursor-pointer" onClick={handleLogoClick} >One A Day</h1>
      <div className="space-x-4 flex items-center">
        {user ? (
          <button className="px-4 py-2" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <>
            <button className="px-4 py-2" onClick={() => navigate('/login')}>
              Login
            </button>
            <button className="px-4 py-2" onClick={() => navigate('/signup')}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
