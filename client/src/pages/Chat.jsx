import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { CHAT_EXISTS, QUERY_FRIENDS } from '../utils/queries';

export default function Chat() {
    const { friendID } = useParams();

    const { loading: chatLoading, data: chatData } = useQuery(CHAT_EXISTS, {
        variables: { user2: friendID }
    });

    if (chatLoading && !chatData) {
        return <div>Loading...</div>
    } if (!chatLoading && chatData) {
        location.replace(`/chat/${chatData.chatExists._id}`);
    } if (!chatLoading && !chatData) {
        
    }

    // const { loading: friendsLoading, data: friendsData } = useQuery(QUERY_FRIENDS);

    // const friends = friendsData?.me.friends;
    // console.log(friends);

    // useEffect(() => {
    //     console.log('useEffect!')
    //     getChatLink();
    // }, [friends])
    
    // function getChatLink() {
    //     for (let i= 0; i < friends; i++) {
    //         // const { loading: chatLoading, data: chatData } = useQuery(CHAT_EXISTS, {
    //         //     variables: { user2: friends[i]._id }
    //         // });
    //         console.log(friends[i]);
    //     }
    // }

}