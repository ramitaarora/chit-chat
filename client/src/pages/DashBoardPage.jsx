import '../styles/dashboard.css';
import Floatingbutton from '../components/Floatingbuttons.jsx';
import { useQuery } from '@apollo/client';
import { QUERY_FRIENDS, CHAT_EXISTS } from '../utils/queries.js';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function Dashboard() {

    const { loading: friendsLoading, data: friendsData } = useQuery(QUERY_FRIENDS);

    const friends = friendsData?.me.friends;

    // Query for chat inside map function?
    // const { loading: chatLoading, data: chatData } = useQuery(CHAT_EXISTS);

    return (
        <div>
            <section className="header">
                <h1> <img src="/chitchatlogo.png"></img> Chit Chat <img src="/chitchatlogo.png"></img></h1>
                <h2>Chats</h2>
            </section>
            <section className="inbox-container">
                {friendsLoading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        {
                            friends.map((friend) => (
                                <div key={friend._id} className="chat-preview">
                                    <Link to={`/user/${friend._id}`}>
                                        <section className="profile-picture">
                                            <img src={friend.photo} alt="user-one"></img>
                                        </section>
                                    </Link>
                                    <Link to={`chat/:chatID`}>
                                        <section className="message-preview">
                                            <h3>{friend.username}</h3>
                                            <p>So about coding...</p>
                                        </section>
                                    </Link>
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