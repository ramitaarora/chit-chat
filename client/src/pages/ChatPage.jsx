import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CHAT } from '../utils/queries';
import FriendHeader from '../components/FriendHeader';
import ConvoBox from '../components/ConvoBox';
import SendBox from '../components/SendBox';
import Auth from '../utils/auth';

import { socket } from '../socket'
import ConnectionState from '../components/ConnectionState';
import ConnectionManager from '../components/ConnectionManager';

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
        const userID1 = data.chat.user1._id;
        const userID2 = data.chat.user2._id;

        let userID;
        
        if (userID1 === Auth.getProfile().data._id) {
            userID = userID1;
        } else {
            userID = userID2;
        }

        if (userID) {
            return (
                <main>
                    {/*<ConnectionState isConnected={ isConnected } />*/}
                    <FriendHeader userID={userID} />
                    <ConvoBox chat={selectedChat} fooEvents={fooEvents} setFooEvents={setFooEvents} socket={socket}/>
                    {/*<ConnectionManager />*/}
                    <SendBox chatID={chatID} fooEvents={fooEvents} setFooEvents={setFooEvents}/>
                </main>
            )    
        }         
    }
}