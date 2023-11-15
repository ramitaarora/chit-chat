import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_CHAT } from '../utils/queries';
import { NEW_CHAT } from '../utils/mutations'; // Need mutation to update user with a new friend
import FriendHeader from '../components/FriendHeader';

export default function OtherProfilePage() {

    const { userID } = useParams();

    const [addChat, { error }] = useMutation(NEW_CHAT)

    const { data } = useQuery(QUERY_USER, {
        variables: { _id: userID }
    });

    const user = data?.user;

    const handleAddFriend = () => {
        // Need to add friends category to users
    }

    const handleNewChat = async () => {
        try {
            const chatExists = await Chat.findOne({
                $or: [
                    { user1: context.user._id, user2: user._id },
                    { user1: user._id, user2: context.user._id },
                ],
            });

            if (chatExists) {
                const chatID = chatExists._id;

                document.location.replace(`/chat/${chatID}`)
            } else {
                const { newChat } = await addChat({
                    variables: {
                        user2: user._id
                    },
                });

                const chatID = newChat._id;

                document.location.replace(`/chat/${chatID}`);
            };

        } catch (err) {
            console.error(err);
        };
    };

    return (
        <main>
            <FriendHeader userID={userID} />
            <section>
                <div>{user.photo}</div>
                <div>{user.fullName}</div>
                <div>{user.bio}</div>
                <button onClick={handleAddFriend}>+</button>
                <button onClick={handleNewChat}>Start Chat</button>
                {user.interests.map((interest, index) => (
                    <div key={index}>{interest}</div>
                ))}
            </section>
        </main>
    )
}