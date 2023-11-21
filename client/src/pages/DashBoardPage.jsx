import '../styles/dashboard.css';
import FloatingButton from '../components/Floatingbuttons.jsx';
import { useQuery } from '@apollo/client';
import { QUERY_FRIENDS, CHAT_EXISTS } from '../utils/queries.js';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Auth from '../utils/auth';
import { useState } from 'react';

function Dashboard() {
    const { loading: friendsLoading, data: friendsData } = useQuery(QUERY_FRIENDS);

    const friends = friendsData?.me.friends;
    
    if (friendsLoading && !friendsData) {
        return (
            <div>Loading Dashboard...</div>
        )
    } else if (friendsData && !friendsLoading) {
        return (
            <main className="dashboard-container">
                <Header />
                <h2>Friends List</h2>
                <section className="inbox-container">
                    {
                        friends.map((friend) => (
                            <div key={friend._id} className="chat-preview">
                                <Link to={`/user/${friend._id}`}>
                                    <section className="profile-picture">
                                        <img src={friend.photo} alt="user-one"></img>
                                    </section>
                                    <section className="message-preview">
                                        <h3>{friend.username}</h3>
                                        <p>So about coding...</p>
                                    </section>
                                </Link>
                            </div>
                        ))
                    }
                    <Link to="/users">Find other users!</Link>
                </section>
                <Floatingbutton />
            </main>
        )
    } else {
        return (
            <main>
                <Header />
                <div>Friends List is Empty</div>
                <Link to="/users">Add friends!</Link>
            </main>
        )
    }

}

export default Dashboard;