import '../styles/dashboard.css';
import FloatingButton from '../components/Floatingbuttons.jsx';
import { useQuery, useLazyQuery, useMutation } from '@apollo/client';
import { NEW_CHAT } from '../utils/mutations';
import { QUERY_FRIENDS, CHAT_EXISTS } from '../utils/queries.js';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Auth from '../utils/auth';
import { useState } from 'react';

function Dashboard() {
    const { loading: friendsLoading, data: friendsData } = useQuery(QUERY_FRIENDS);

    const friends = friendsData?.me.friends;

    // New Chat Handler

    const [addChat, { chatErr }] = useMutation(NEW_CHAT);

    const [checkIfExists, { loading: chatLoading, data: chatData, refetch }] = useLazyQuery(CHAT_EXISTS);

    const handleNewChat = async (ID) => {

        try {

            let exists = null;

            await checkIfExists({ variables: { user2: ID } });

            if (chatLoading) {
                console.log('still loading...')
            } else {
                exists = chatData?.chatExists
            }
                       
            if (exists) {
                console.log('found exists');
                const chatID = chatData.chatExists._id;
                document.location.replace(`/chat/${chatID}`);
                return exists;
            } else {
                const { data } = await addChat({
                    variables: { user2: ID }
                })
                const newChatID = data?.newChat._id;
                document.location.replace(`/chat/${newChatID}`);
                console.log('new chat created');
                refetch();
                return data;
            }

        } catch (e) {
            console.log(e);
            console.log(chatErr);
        }
    };

    if (friendsLoading) {
        return (
            <div>Loading Dashboard...</div>
        )
    } else if (friendsData) {

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
                                </Link>
                                <section className="message-preview" onClick={() => handleNewChat(friend._id)}>
                                    <h3>{friend.username}</h3>
                                    <p>So about coding...</p>
                                </section>
                            </div>
                        ))
                    }
                    <Link to="/users">ADD NEW FRIENDS</Link>
                </section>
                <FloatingButton />
            </main>
        )
    }
}

export default Dashboard;