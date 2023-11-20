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
        console.log('adding friend');
        try {
            await addFriend({
                variables: { friend: ID }
            })
            alert('Added a new friend!');
        } catch (e) {
            console.log(e);
            console.log(friendErr);
        }

    };

    // New Chat Handler

    const [addChat, { chatErr }] = useMutation(NEW_CHAT);

    const { loading: chatLoading, data: chatData, refetch } = useQuery(CHAT_EXISTS, {
        variables: { user2: userID }
    });

    const handleNewChat = async (ID, ifExists) => {
        try {
            if (ifExists) {
                console.log('found exists');
                // const chatID = exists._id;
                // document.location.replace(`/chat/${chatID}`);
                return ifExists;
            } else {
                const { data } = await addChat({
                    variables: { user2: ID }
                })
                // const newChat = data?.newChat;
                // const chatID = newChat._id;
                // document.location.replace(`/chat/${chatID}`);
                // return newChat;
                console.log('new chat created');
                refetch();
                return data;
            }

        } catch (e) {
            console.log(e);
            console.log(chatErr);
        }
    };

    // Loading User Profile Page

    const { loading: userLoading, data: userData } = useQuery(QUERY_USER, {
        variables: { id: userID }
    });

    if (userLoading || chatLoading) {
        return (
            <div>Loading User Profile...</div>
        )
    } else if (userData && chatData) {

        const user = userData?.user;
        const ifExists = chatData?.chatExists;

        return (
            <main>
                <FriendHeader userID={userID} />
                <section>
                    <div>{user.photo}</div>
                    <div>{user.fullName}</div>
                    <div>{user.bio}</div>
                    <button id="add-friend" onClick={() => handleAddFriend(user._id)}>
                        <img src="../src/assets/plus.png" id="editImg" />
                    </button>
                    <button onClick={() => handleNewChat(user._id, ifExists)}>Start Chat Button</button>
                    {user.interests.map((interest, index) => (
                        <div key={index}>{interest}</div>
                    ))}
                </section>
            </main>
        )
    };
}