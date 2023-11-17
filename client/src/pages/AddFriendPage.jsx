import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import Auth from '../utils/auth';
import Header from '../components/Header';

export default function AddFriendPage() {

    const { loading, data } = useQuery(QUERY_USERS);

    const users = data?.users || [];

    const handleFriendProfilePage = (userID) => {
        console.log(`/user/${userID}`);
        document.location.replace(`/user/${userID}`)
    }

    if (Auth.loggedIn()) {
        return (
            <main>
                <Header />
                <div>Add Friends</div>
                <div>
                    {loading ? (
                        <div>Loading Users...</div>
                    ) : (
                        <div>
                            {users.map((user) => (user._id !== Auth.getProfile().data._id ? (
                                <section key={user._id}>
                                    <div>{user.photo}</div>
                                    <div>{user.username}</div>
                                    <button onClick={() => handleFriendProfilePage(user._id)}>+</button>
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