import '../styles/dashboard.css';
import '/profile-bubble.png';
import '/profile-2.png';
import '/profile-3.png';
import '/profile-4.png';
import '/chitchatlogo.png';
import Floatingbutton from '../components/Floatingbuttons.jsx';
import { useQuery } from '@apollo/client'
import { QUERY_USERS } from '../utils/queries.js'
function Dashboard() {
    const { loading, data } = useQuery[QUERY_USERS]
    const users = data?.user || []
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
                        users.map((user) => (
                            <div className="chat-preview">
                                <section className="profile-picture">
                                    <img src={user.photo} alt="user-one"></img>
                                </section>
                                <section className="message-preview">
                                    <h3>{user.username}</h3>
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

    );
}

export default Dashboard;