import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Header from '../components/Header';

export default function AddFriendPage() {

    const { loading, data } = useQuery(QUERY_USER);

    const handleAddFriend = () => {
        // Finish after adding friend category to users
    }

    const users = data?.users || [];

    return (
        <main>
            <Header />
            <div>Add Friends</div>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        {users.map((user) => (
                            <section key={user._id}>
                                <div>{user.photo}</div>
                                <div>{user.username}</div>
                                <button onClick={handleAddFriend}>+</button>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}