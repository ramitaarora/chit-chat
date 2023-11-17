import '../styles/dashboard.css';
import '/profile-bubble.png';
import '/profile-2.png';
import '/profile-3.png';
import '/profile-4.png';
import '/chitchatlogo.png';
import Floatingbutton from '../components/Floatingbuttons.jsx';
import { useQuery } from '@apollo/client';
import { QUERY_FRIENDS } from '../utils/queries.js';
import Auth from '../utils/auth';

function Dashboard() {

    const { loading, data } = useQuery(QUERY_FRIENDS);

    const friends = data?.me.friends;

    return (
        <div>
            <section className="header">
                <h1> <img src="/chitchatlogo.png"></img> Chit Chat <img src="/chitchatlogo.png"></img></h1>
                <h2>Chats</h2>
            </section>
            <section className="inbox-container">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {
                            friends.map((friend, index) => (
                                <div key={index} className="chat-preview">
                                    <section className="profile-picture">
                                        <img src={friend.photo} alt="user-one"></img>
                                    </section>
                                    <section className="message-preview">
                                        <h3>{friend.username}</h3>
                                        <p>So about coding...</p>
                                    </section>
                                </div>
                            ))
                        }
                    </>
                )}
            </section>
            <Floatingbutton />
        </div>
    )
}

export default Dashboard;