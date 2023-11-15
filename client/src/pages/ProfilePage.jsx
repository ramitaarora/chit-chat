
import { useState } from "react";

export default function ProfilePage() {
    const [section, setSection]=useState(false)
    console.log(section);
    return (
        
      <div>
        { section ?
            <div className="textion">
                <div>
                    <div id ="username">
                        <h3>@username</h3>
                    </div>
                    <div id="profilePicture">
                        <img></img>
                    </div>
                    <div id="name">
                        <h2>Friend Name Placeholder</h2>
                    </div>
                    <div id="bio">
                        bio goes here
                    </div>
                    <div>
                        <button>add friend</button>
                        <button>edit</button>
                    </div>
                    <div class="container" id="interests">
                        <button>interest1</button> <button>interest1</button> <button>interest2</button>
                    </div>

                </div>    
            </div> : null
        }
      </div>
    );
  }
  