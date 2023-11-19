import { useState } from 'react';
import Auth from '../utils/auth';
import Floatingbutton from '../components/Floatingbuttons.jsx';

export default function ProfilePage() {
    const [section, setSection] = useState(false)
    console.log(section);

    // if (Auth.loggedIn()) {
        return (
            <div>
                <div>
                    <div>
                        <div id="username">
                            <h3>@catGod</h3>
                        </div>
                        <div>
                            <img id="profilePicture" src="https://hips.hearstapps.com/hmg-prod/images/sacred-lotus-gettyimages-1143403162-646fa5a441f5d.jpg?crop=0.535xw:1.00xh;0.0519xw,0&resize=980:*"></img>
                        </div>
                        <div id="name">
                            <h2>jamie</h2>
                        </div>
                        <div id="bio">
                            <p> all about me </p>
                        </div>
                        <div>
                            <button id="add-friend"><img src="../src/assets/plus.png" id="editImg" /></button>
                            <button id="edit"><img src="../src/assets/pencil.png" id="editImg" /></button>
                        </div>
                        <div className="container" id="interests">
                            <button className="interest" id="interest1">cats</button> <button className="interest" id="interest2">food</button> <button className="interest" id="interest3">photography</button>
                        </div>
                    </div>
                </div>
                <Floatingbutton />
            </div>
        );
    // } else {
        // document.location.replace('/');
    }
// }
