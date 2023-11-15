import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CHAT } from '../utils/queries';
import OtherUserHeader from '../components/OtherUserHeader';
import ConvoBox from '../components/ConvoBox';
import SendBox from '../components/SendBox';

export default function ChatPage() {

    const { chatID } = useParams();

    const { data } = useQuery(QUERY_CHAT, {
        variables: { _id: chatID }
    });

    const selectedChat = data?.chat;

    const userID = selectedChat.user2._id;

    const handleSendMsg = () => {
        // Use socket.io here
    };

    return (
        <main>
            <OtherUserHeader userID={userID} />
            <ConvoBox chat={selectedChat}/>
            <SendBox />
        </main>
    )
}