import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, CHAT_EXISTS } from '../utils/queries';
import { NEW_CHAT, ADD_FRIEND } from '../utils/mutations';
import FriendHeader from '../components/FriendHeader';
import Auth from '../utils/auth';

export default function FriendProfilePage() {

    const { userID } = useParams();

    // Add Friend Handler

    const [addFriend, { friendErr }] = useMutation(ADD_FRIEND);

    const handleAddFriend = async (ID) => {

        try {
            await addFriend({
                variables: { friend: ID }
            })
        } catch (e) {
            console.log(e);
            console.log(friendErr);
        }

    };

    // New Chat Handler

    const [addChat, { chatErr }] = useMutation(NEW_CHAT);

    const { data: existsData } = useQuery(CHAT_EXISTS, {
        variables: { user2: userID }
    });

    const exists = existsData?.chatExists;

    const handleNewChat = async (ID) => {
        try {
            if (exists) {
                console.log('found exists');
                // const chatID = exists._id;
                // document.location.replace(`/chat/${chatID}`);
                return exists;
            } else {
                const { data } = await addChat({
                    variables: { user2: ID }
                })
                // const newChat = data?.newChat;
                // const chatID = newChat._id;
                // document.location.replace(`/chat/${chatID}`);
                // return newChat;
                return data;
            }

        } catch (e) {
            console.log(e);
            console.log(chatErr);
        }
    };

    // Loading User Profile Page

    const { loading, data: userData } = useQuery(QUERY_USER, {
        variables: { id: userID }
    });

    const user = userData?.user;

    return (
        <main>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                   <FriendHeader userID={userID} />
                    <section>
                        <div>{user.photo}</div>
                        <div>{user.fullName}</div>
                        <div>{user.bio}</div>
                        <button id="add-friend" onClick={() => handleAddFriend(user._id)}>
                            <img src="../src/assets/plus.png" id="editImg" />
                        </button>
                        <button onClick={() => handleNewChat(user._id)}>Start Chat</button>
                        {user.interests.map((interest, index) => (
                            <div key={index}>{interest}</div>
                        ))}
                    </section> 
                </>
            )}
            
        </main>
    )

    // if (loading) {
    //     return (
    //         <div>Loading User Profile...</div>
    //     )
    // } else {
    //     const user = userData?.user;

    //     return (
    //         <main>
    //             <FriendHeader userID={userID} />
    //             <section>
    //                 <div>{user.photo}</div>
    //                 <div>{user.fullName}</div>
    //                 <div>{user.bio}</div>
    //                 <button onClick={() => handleAddFriend(user._id)}>Add Friend</button>
    //                 <button id="add-friend" onClick={() => handleAddFriend(user._id)}>
    //                     <img src="../src/assets/plus.png" id="editImg" />
    //                 </button>
    //                 <button onClick={() => handleNewChat(user._id)}>Start Chat</button>
    //                 {user.interests.map((interest, index) => (
    //                     <div key={index}>{interest}</div>
    //                 ))}
    //             </section>
    //             <Logout />
    //         </main>
    //     )
    // };
}