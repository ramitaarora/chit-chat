import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '../utils/mutations';
import Header from '../components/Header';

export default function AddFriendPage() {

    const [addFriend] = useMutation(ADD_FRIEND);

    const { loading, data } = useQuery(QUERY_USERS);

    const users = data?.users || [];

    const handleAddFriend = (userID) => {
        addFriend({
            variables: { friend: userID }
        })
            .then((result) => {
                console.log('Added friend successfully', result)
            })
            .then((err) => {
                console.error('Error adding friend', err)
            })
    };

    return (
        <main>
            <Header />
            <div>Add Friends</div>
            <div>
                {loading ? (
                    <div>Loading Users...</div>
                ) : (
                    <div>
                        {users.map((user) => (
                            <section key={user._id}>
                                <div>{user.photo}</div>
                                <div>{user.username}</div>
                                <button onClick={() => handleAddFriend(user._id)}>+</button>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </main>
    )
}