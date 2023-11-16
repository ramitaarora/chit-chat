import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Login({ handleSignup }) {

    const [formState, setFormState] = useState({ username: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState },
            });

            console.log(data);

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }

        setFormState({
            username: '',
            password: '',
        });

        // document.location.replace('/dashboard');
    };

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <input
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                />
                <input
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                />
                <button
                    style={{ cursor: 'pointer' }}
                    type="submit"
                >
                    Login
                </button>
                <button
                    style={{ cursor: 'pointer' }}
                    onClick={handleSignup}
                >
                    Sign Up Instead
                </button>
            </form>
        </>
    )
}