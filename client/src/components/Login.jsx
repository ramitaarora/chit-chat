import { useState } from 'react';
import Auth from '../utils/auth';

export default function Login() {

    const [formState, setFormState] = useState({ uesrname: '', password: '' });
    const [login, { error, data }] = useMutation(LOGIN_USER); // Will need to change to match schema

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

            Auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }

        setFormState({
            username: '',
            password: '',
        });
    };

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <input
                    placeholder="Your username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                />
                <input
                    placeholder="Your password"
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
            </form>
        </>
    )
}