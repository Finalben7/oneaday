import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  
  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-xl font-bold">OneADay</h1>
      <div className="space-x-4 flex items-center">
        <button className="px-4 py-2" onClick={() => navigate('/login')}>Login</button>
        <button className="px-4 py-2" onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;