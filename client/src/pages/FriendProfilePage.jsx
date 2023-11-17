import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { NEW_CHAT, ADD_FRIEND } from '../utils/mutations';
import FriendHeader from '../components/FriendHeader';

export default function FriendProfilePage() {

    const { userID } = useParams();

    const [addFriend, { friendErr }] = useMutation(ADD_FRIEND);

    const [addChat, { chatErr }] = useMutation(NEW_CHAT)

    const handleAddFriend = async (userID) => {

        try {
            await addFriend({
                variables: { friend: userID }
            })
        } catch (e) {
            console.log(e);
            console.log(friendErr);
        }

    };

    const handleNewChat = async (userID) => {

        try {
            const { data } = await addChat({
                variables: { user2: userID }
            })

            console.log(data);

        } catch (e) {
            console.log(e);
            console.log(chatErr);
        }

    };

    const { loading, data } = useQuery(QUERY_USER, {
        variables: { id: userID }
    });

    if (loading) {
        return (
            <div>Loading User Profile...</div>
        )
    } else {
        const user = data?.user;

        return (
            <main>
                <FriendHeader userID={userID} />
                <section>
                    <div>{user.photo}</div>
                    <div>{user.fullName}</div>
                    <div>{user.bio}</div>
                    <button onClick={() => handleAddFriend(user._id)}>Add Friend</button>
                    <button onClick={() => handleNewChat(user._id)}>Start Chat</button>
                    {user.interests.map((interest, index) => (
                        <div key={index}>{interest}</div>
                    ))}
                </section>
            </main>
        )
    }

    // return (
    //     <main>
    //         <FriendHeader userID={userID} />
    //         <section>
    //             <div>{user.photo}</div>
    //             <div>{user.fullName}</div>
    //             <div>{user.bio}</div>
    //             <button onClick={() => handleAddFriend(user._id)}>+</button>
    //             <button onClick={() => handleNewChat(user._id)}>Start Chat</button>
    //             {user.interests.map((interest, index) => (
    //                 <div key={index}>{interest}</div>
    //             ))}
    //         </section>
    //     </main>
    // )
}