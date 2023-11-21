import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import Header from '../components/Header';
import FloatingButton from '../components/Floatingbuttons.jsx';

export default function UsersListPage() {

    const { loading, data } = useQuery(QUERY_USERS);

    const users = data?.users || [];

    if (Auth.loggedIn()) {
        return (
            <main className="usersListPage">
                <Header />
                <h2>Users:</h2>
                <div className='centered'>
                    {loading ? (
                        <div>Loading Users...</div>
                    ) : (
                        <div>
                            {users.map((user) => (user._id !== Auth.getProfile().data._id ? (
                                <section key={user._id}>
                                    <img className="profilePicture" src={user.photo}></img>
                                    <div><h3>@ {user.username}</h3></div>
                                    <Link to={`/user/${user._id}`}><button>view profile</button></Link>
                                </section>
                            ) : null))}
                        </div>
                    )}
                </div>
            </main>
        )
    } else {
        document.location.replace('/');
    }
    
}