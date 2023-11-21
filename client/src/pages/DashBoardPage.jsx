import '../styles/dashboard.css';
import { useQuery } from '@apollo/client';
import { QUERY_FRIENDS, CHAT_EXISTS } from '../utils/queries.js';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Auth from '../utils/auth.js';

function Dashboard() {
    const { loading: friendsLoading, data: friendsData } = useQuery(QUERY_FRIENDS);

    const friends = friendsData?.me.friends;

    if (Auth.loggedIn()) {
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
                                <Link to={`/user/${friend._id}`}>
                                    <div key={friend._id} className="chat-preview">
                                        <section className="profile-picture">
                                            <img src={friend.photo} alt="user-one"></img>
                                        </section>
                                        <section className="message-preview">
                                            <h3>{friend.username}</h3>
                                            <p>So about coding...</p>
                                        </section>
                                    </div>
                                </Link>
                            ))
                        }
                        <Link to="/users">Find other users!</Link>
                    </section>
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
    } else {
        document.location.replace('/');
    }
    

}

export default Dashboard;