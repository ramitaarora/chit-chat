
import { useState } from "react";

export default function ProfilePage() {
    const [section, setSection]=useState(false)
    console.log(section);
    return (
        
      <div>
        <div className="textion">
            <div>
                <div id ="username">
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
                    <button id="add-friend"><img src="../src/assets/plus.png" id="editImg"/></button>
                    <button id="edit"><img src="../src/assets/pencil.png" id="editImg"/></button>
                </div>
                <div class="container" id="interests">
                    <button class="interest">cats</button> <button class="interest">food</button> <button class="interest">photography</button>
                </div>

            </div>    
        </div> 
      </div>
    );
  }
  