import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CHAT } from '../utils/queries';
import FriendHeader from '../components/FriendHeader';
import ConvoBox from '../components/ConvoBox';
import SendBox from '../components/SendBox';

import { socket } from 'socket.io-client';
import { ConnectionState } from '../components/ConnectionState';
import { ConnectionManager } from '../components/ConnectionManager';

export default function ChatPage() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(value) {
            setFooEvents(previous => [...previous, value]);
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('foo', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('foo', onFooEvent);
        };
    }, []);

    const { chatID } = useParams();

    const { loading, data } = useQuery(QUERY_CHAT, {
        variables: { id: chatID }
    });

    if (loading) {
        return <div>Loading...</div>;
    } else {
        const selectedChat = data.chat;
        const userID = data.chat.user2._id;

        return (
            <main>
                <FriendHeader userID={userID} />
                <ConvoBox chat={selectedChat}/>
                <SendBox chatID={chatID}/>
            </main>
        )
    }
    
}