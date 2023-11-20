import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import Floatingbutton from '../components/Floatingbuttons.jsx';
import Logout from '../components/Logout';

export default function ProfilePage() {
    if (Auth.loggedIn()) {
      const { data, loading } = useQuery(QUERY_ME);
      const myData = data?.me;
  
      if (loading) {
        return <div>Loading...</div>;
      } else {
        return (
          <div>
            <div>
              <div>
                <div id="username">
                  <h3>{myData.username}</h3>
                </div>
                <div>
                  <img id="profilePicture" src={myData.photo} alt="Profile" />
                </div>
                <div id="name">
                  <h2>{myData.fullName}</h2>
                </div>
                <div id="bio">
                  <p>{myData.bio}</p>
                </div>
                <div className="container" id="interests">
                  {myData.interests.map((interest, index) => (
                    <button key={index} className="interest" id={`interest${index + 1}`}>
                      {interest}
                    </button>
                  ))}
                </div>
                <Link to="/profile/edit">
                  <button id="edit">
                    <img src="../src/assets/pencil.png" id="editImg" alt="Edit Profile" />
                  </button>
                </Link>
                <Logout />
              </div>
            </div>
            <FloatingButton />
          </div>
        );
      }
    } else {
      document.location.replace('/');
    }
  }
