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
                <div>
                    <input
                        className='pill'
                        placeholder="Full Name"
                        name="fullName"
                        type="text"
                        value={formState.fullName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        className='pill'
                        placeholder="Email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        className='pill'
                        placeholder="Username"
                        name="username"
                        type="text"
                        value={formState.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input
                        className='pill'
                        placeholder="Password"
                        name="password"
                        type="password"
                        value={formState.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button
                        style={{ cursor: 'pointer' }}
                        type="submit"
                    > Create
                    </button>
                </div>
                <div>
                    <button
                        style={{ cursor: 'pointer' }}
                        onClick={handleLogin}
                    >
                        Login Instead
                    </button>
                </div>
            </form>
        </>
    )
}