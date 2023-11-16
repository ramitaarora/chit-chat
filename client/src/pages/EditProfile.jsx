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
            <h2>EDIT PROFILE</h2>
            <div class="form-container">
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label>Change Your Username</label>
                        <div>
                            <input
                            placeholder="Username"
                            name="username"
                            type="text"
                            value={formState.username}
                            onChange={handleChange}
                        />
                        </div>
                    </div>
                    <div>
                        <label>Change Your Name</label>
                        <div>
                            <input
                            placeholder="name"
                            name="name"
                            type="text"
                            value={formState.name}
                            onChange={handleChange}
                        />
                        </div>
                    </div>
                    <div>
                        <label>Change Your Profile Pic</label>
                        <div>
                            <input
                            placeholder="profilePic"
                            name="profilepicture"
                            type="image"
                            value={formState.image}
                            onChange={handleChange}
                        />
                        </div>
                        
                    </div>
                    <div>
                        <label>Change Your Bio</label>
                        <div>
                            <input
                            placeholder="bio"
                            name="bio"
                            type="text"
                            value={formState.name}
                            onChange={handleChange}
                        />
                        </div>
                        
                    </div>
                    <div>
                        <label>Change Your Interests</label>
                        <div>
                            <input
                            placeholder="interest"
                            name="interest1"
                            type="text"
                            value={formState.name}
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                            <input
                            placeholder="interest"
                            name="interest2"
                            type="text"
                            value={formState.name}
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                            <input
                            placeholder="interest"
                            name="interest3"
                            type="text"
                            value={formState.name}
                            onChange={handleChange}
                        />
                        </div>    
                    </div>
                    <div>
                        <button id ="save"type="submit"> Save Changes</button>
                    </div>
                    
                </form>
            </div>
            <h2>THEMES</h2>
            <div class="theme-container">
                
                <div class="themes">
                    <div>
                        <button class="theme" id="night">
                            night mode
                        </button>
                    </div>
                <div>
                        <button class="theme" id="day">
                            day mode
                        </button>
                </div>
                    <div>
                        <button class="theme" id="dawn">
                            dawn mode
                        </button>
                    </div>
                
                </div>
            
            </div>
            
        </div>
    )
}