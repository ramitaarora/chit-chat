import { useState, useEffect } from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { EDIT_USER } from '../utils/mutations';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';


export default function EditProfile() {

    const [formState, setFormState] = useState({ username: '', name: '', photo: '', bio: '' });

    const [editUser, { error }] = useMutation(EDIT_USER);

    const [findUsername, { loading, data }] = useLazyQuery(QUERY_ME);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await findUsername();
                console.log('searching for username');

                if (data) {
                    const username = data?.me.username;
                    setFormState({ username: username });
                }
            } catch (err) {
                console.error(err);
            }
        }

        fetchData();
    }, [data]);

    const imagePaths = [
        '/profile-pics/astronaut.png',
        '/profile-pics/avocado.png',
        '/profile-pics/cat.png',
        '/profile-pics/gamer.png',
        '/profile-pics/icecream.png',
        '/profile-pics/livingroom.png',
        '/profile-pics/man.png',
        '/profile-pics/paperplane.png',
        '/profile-pics/rain.png',
        '/profile-pics/river.png',
        '/profile-pics/rubberduck.png',
        '/profile-pics/watermelon.png',
        '/profile-pics/woman.png',
        '/profile-pics/zebra.png',
    ];

    const setTheme = (event) => {
        const { id } = event.target;
        console.log(id)

        if (id === 'night') {
            document.body.style.backgroundImage = "linear-gradient(to bottom, rgba(2,0,36,1) 0%, #5543E6 100%)";
            document.body.style.color = "white";
            Array.from(document.querySelectorAll('h2')).map(function (h2) {
                h2.style.color = "#C1A2FF";
            })
            Array.from(document.querySelectorAll('button')).map(function (button) {
                button.style.backgroundColor = "#8C52FF";
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
            Array.from(document.querySelectorAll('h2')).map(function (h2) {
                h2.style.color = "white";
            })
            Array.from(document.querySelectorAll('button')).map(function (button) {
                button.style.backgroundColor = "#43ABE6";
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
            Array.from(document.querySelectorAll('h2')).map(function (h2) {
                h2.style.color = "white";
            })
            Array.from(document.querySelectorAll('button')).map(function (button) {
                button.style.backgroundColor = "#FF66C4";
            })
            localStorage.setItem("bgImage", "linear-gradient(to bottom, #FFB3E2 0%, #FFC6C6 100%)");
            localStorage.setItem("bodyColor", "white");
            localStorage.setItem("h2Color", "white");
            localStorage.setItem("btnColor", "#FF66C4");
            localStorage.setItem("headerImg", "../src/assets/chitchatheader-white.png");
        }
    };

    const handleChange = (event) => {
        const { name, value, type } = event.target;

        if (type === 'radio' && name === 'photo') {
            setFormState({
                ...formState,
                [name]: value,
            });
        } else {
            setFormState({
                ...formState,
                [name]: value,
            });
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            await editUser({
                variables: { ...formState }
            });

            await setFormState({
                username: '',
                name: '',
                photo: '',
                bio: '',
            });

            await document.location.replace('/profile');

        } catch (e) {
            console.error(e);
            console.log(error);
        }
    };
    if (Auth.loggedIn()) {

        if (loading) {
            <div>Loading...</div>

        } else {
            return (
                <div>
                    <h2>EDIT PROFILE</h2>
                    <div className="form-container">
                        <form onSubmit={handleFormSubmit}>
                            <div>
                                <label>Change Your Username</label>
                                <div>
                                    <input
                                        placeholder="username"
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
                                <label>Choose a New Profile Pic</label>
                                <div className="profile-pic-container">
                                    {imagePaths.map((pic, index) => (
                                        <div key={index}>
                                            <input type="radio" name="photo" value={pic} onChange={handleChange} />
                                            <img src={pic} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <button id="save" type="submit">Save Changes</button>
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
        }
    } else {
        document.location.replace('/');
    }
}