import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import FloatingButton from '../components/Floatingbuttons.jsx';
import Logout from '../components/Logout';

export default function ProfilePage() {
    if (Auth.loggedIn()) {
      const { data, loading } = useQuery(QUERY_ME);
  
      if (loading) {
        return <div>Loading...</div>;
      } else {

        const myData = data?.me;
        console.log(myData);

        return (
          <div className='centered'>
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
