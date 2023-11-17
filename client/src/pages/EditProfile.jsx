import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';


export default function EditProfile({ handleSignup }) {

    const [formState, setFormState] = useState({ username: {}, name: {}, photo: {}, bio: {}, interests: {}} );


    const setTheme = (event) => {
        const {id} = event.target;
        console.log(id)

        if (id === 'night') {
            document.body.style.backgroundImage = "linear-gradient(to bottom, rgba(2,0,36,1) 0%, #5543E6 100%)";
            document.body.style.color = "white";
            Array.from(document.querySelectorAll('h2')).map(function(h2) {
                h2.style.color="#C1A2FF";
            })
            Array.from(document.querySelectorAll('button')).map(function(button) {
                button.style.backgroundColor="#8C52FF";
            })

            localStorage.setItem("bgImage", "linear-gradient(to bottom, rgba(2,0,36,1) 0%, #5543E6 100%)");
            localStorage.setItem("bodyColor", "white");
            localStorage.setItem("h2Color", "#C1A2FF");
            localStorage.setItem("btnColor", "#8C52FF");
            localStorage.setItem("headerImg", "../src/assets/chitchatheader.png")

        }
        
        if (id === 'day') {
            document.body.style.backgroundImage = "linear-gradient(to bottom, #93B1F4  0%, #A1C7FF 100%)";
            document.body.style.color = "white";
            Array.from(document.querySelectorAll('h2')).map(function(h2) {
                h2.style.color="white";
            })
            Array.from(document.querySelectorAll('button')).map(function(button) {
                button.style.backgroundColor="#43ABE6";
            })
            localStorage.setItem("bgImage", "linear-gradient(to bottom, #93B1F4  0%, #A1C7FF 100%)");
            localStorage.setItem("bodyColor", "white");
            localStorage.setItem("h2Color", "white");
            localStorage.setItem("btnColor", "#43ABE6");
            localStorage.setItem("headerImg", "../src/assets/chitchatheader-white.png");


        }
        if (id === 'dawn') {
            document.body.style.backgroundImage = "linear-gradient(to bottom, #FFB3E2 0%, #FFC6C6 100%)";
            document.body.style.color = "white";
            Array.from(document.querySelectorAll('h2')).map(function(h2) {
                h2.style.color="white";
            })
            Array.from(document.querySelectorAll('button')).map(function(button) {
                button.style.backgroundColor="#FF66C4";
            })
            localStorage.setItem("bgImage", "linear-gradient(to bottom, #FFB3E2 0%, #FFC6C6 100%)");
            localStorage.setItem("bodyColor", "white");
            localStorage.setItem("h2Color", "white");
            localStorage.setItem("btnColor", "#FF66C4");
            localStorage.setItem("headerImg", "../src/assets/chitchatheader-white.png");
        }
        

        
    }

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

    if (Auth.loggedIn()) {
        return (
            <div>
                <h2>EDIT PROFILE</h2>
                <div className="form-container">
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
                                    value={formState.fullName}
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
                                    value={formState.photo}
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
                                    value={formState.bio}
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
                                    value={formState.interests}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input
                                    placeholder="interest"
                                    name="interest2"
                                    type="text"
                                    value={formState.interests}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <input
                                    placeholder="interest"
                                    name="interest3"
                                    type="text"
                                    value={formState.interests}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div>
                            <button id="save" type="submit"> Save Changes</button>
                        </div>

                    </form>
                </div>
                <h2>THEMES</h2>
                <div className="theme-container">

                    <div className="themes">
                        <div>
                            <button className="theme" id="night" onClick={setTheme}>
                                night mode
                            </button>
                        </div>
                        <div>
                            <button className="theme" id="day" onClick={setTheme}>
                                day mode
                            </button>
                        </div>
                        <div>
                            <button className="theme" id="dawn" onClick={setTheme}>
                                dawn mode
                            </button>
                        </div>

                    </div>

                </div>

            </div>
        )
    } else {
        document.location.replace('/');
    };
}