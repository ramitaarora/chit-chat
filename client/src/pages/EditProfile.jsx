import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

export default function EditProfile({ handleSignup }) {

    const [formState, setFormState] = useState({ username: {}, name: {}, profilePicture: {}, bio: {}, interest: {}} );
  
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
            username: {}, 
            name: {}, 
            profilePicture: {}, 
            bio: {}, 
            interest: {}
        });
    };

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <input
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={formState.username}
                    onChange={handleChange}
                />
                <input
                    placeholder="name"
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                />
                <input
                    placeholder="profilePic"
                    name="profilepicture"
                    type="image"
                    value={formState.image}
                    onChange={handleChange}
                />
                <input
                    placeholder="bio"
                    name="bio"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                />
                <input
                    placeholder="interest"
                    name="interest1"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                />
                <input
                    placeholder="interest"
                    name="interest2"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                />
                <input
                    placeholder="interest"
                    name="interest3"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                />
                <button type="submit"> Save Changes</button>
            </form>
        </div>
    )
}