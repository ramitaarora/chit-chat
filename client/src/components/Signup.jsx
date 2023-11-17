import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Signup({ handleLogin }) {

    const [formState, setFormState] = useState({
        fullName: '',
        email: '',
        username: '',
        password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);

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
            const { data } = await addUser({
                variables: { ...formState },
            });

            Auth.login(data.addUser.token);

        } catch (err) {
            console.error(err);
        };

        document.location.replace('/dashboard');
    };

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <input
                    placeholder="Full Name"
                    name="fullName"
                    type="text"
                    value={formState.fullName}
                    onChange={handleChange}
                />
                <input
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                />
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
                    Create
                </button>
                <button
                    style={{ cursor: 'pointer' }}
                    onClick={handleLogin}
                >
                    Login Instead
                </button>
            </form>
        </>
    )
}