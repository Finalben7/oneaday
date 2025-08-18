import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '@supabase/auth-helpers-react';
import logo from "../assets/react.svg"
import Header from "../components/Header";
import LoadingAnimation from '../components/LoadingAnimation';

const Home = () => {
  const session = useSession();
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setRedirecting(true);
      // Delay slightly to show the message (optional)
      setTimeout(() => {
        navigate('/dashboard');
      }, 4000); // 1 second delay to let user see the message
    }
  }, [session, navigate]);

  if (redirecting) {
    return (
      <LoadingAnimation text= "Returning you to your dashboard" />
    );
  }

  return (
    <div>
      <Header />
      <section className="text-center py-20">
        <h1 className="text-4xl font-bold">Welcome to One A Day</h1>
        <p className="mt-4 text-lg">Your daily accountability companion.</p>
        <img src={logo} alt="Hero" className="mt-8 mx-auto w-1/2 rounded" />
      </section>
    </div>
  );
};

export default Home;
