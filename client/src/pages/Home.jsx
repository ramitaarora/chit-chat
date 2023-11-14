import { useQuery } from '@apollo/client';
import { useState } from 'react';
import Header from '../components/Header';
import Login from '../components/Login';
import Signup from '../components/Signup';

const Home = () => {

  const [form, setForm] = useState(null);

  const handleLogin = () => {
    setForm('login');
  };

  const handleSignup = () => {
    setForm('signup');
  };

  return (
    <main>
      <Header />
      {form === null && (
        <div>
          <button onClick={handleLogin}>Login</button>
          <button onClick={handleSignup}>Signup</button>
        </div>
      )}
      {form === 'login' && <Login />}
      {form === 'signup' && <Signup />}
    </main>
  );
};

export default Home;
