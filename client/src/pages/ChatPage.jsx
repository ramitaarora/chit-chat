import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CHAT } from '../utils/queries';
import FriendHeader from '../components/FriendHeader';
import ConvoBox from '../components/ConvoBox';
import SendBox from '../components/SendBox';

export default function ChatPage() {

    const { chatID } = useParams();

    const { loading, data } = useQuery(QUERY_CHAT, {
        variables: { id: chatID }
    });
    
    const handleSendMsg = () => {
        // Use socket.io here
    };

    if (loading) {
        return <div>Loading...</div>;
    } else {
        const selectedChat = data.chat;
        const userID = data.chat.user2._id;

        return (
            <main>
                <FriendHeader userID={userID} />
                <ConvoBox chat={selectedChat}/>
                <SendBox sendMsg={handleSendMsg}/>
            </main>
        )
    }
    
}