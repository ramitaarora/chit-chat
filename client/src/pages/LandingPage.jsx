import { useState } from 'react';
import Auth from '../utils/auth';
import Header from '../components/Header';
import Login from '../components/Login';
import Signup from '../components/Signup';

const LandingPage = () => {

    const [form, setForm] = useState(null);

    const handleLogin = () => {
        setForm('login');
    };

    const handleSignup = () => {
        setForm('signup');
    };

    if (Auth.loggedIn) {
        document.location.replace('/dashboard')
    } else {
        return (
            <main>
                <Header />
                {form === null && (
                    <div>
                        <button onClick={handleLogin}>Login</button>
                        <button onClick={handleSignup}>Signup</button>
                    </div>
                )}
                <div>
                    {form === 'login' && <Login handleSignup={handleSignup} />}
                    {form === 'signup' && <Signup handleLogin={handleLogin} />}
                </div>
            </main>
        );
    }
};

export default LandingPage;