import { Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
  )
}

export default App