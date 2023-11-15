import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_USER } from '../utils/queries';
import { NEW_CHAT } from '../utils/mutations'; // Need mutation to update user with a new friend
import OtherUserHeader from '../components/OtherUserHeader';

export default function OtherProfilePage() {

    const { userID } = useParams();

    const { data } = useQuery(QUERY_SINGLE_USER, {
        variables: { _id: userID }
    });

    const name = data?.fullName;
    const photo = data?.photo;
    const bio = data?.bio;
    const interests = data?.interests;

    const handleAddFriend = () => {

    }

    const handleNewChat = () => {

    }
 
    return (
        <main>
            <OtherUserHeader />
            <section>
                <div>{photo}</div>
                <div>{name}</div>
                <div>{bio}</div>
                <button onClick={handleAddFriend}>Add Friend</button>
                <button onClick={handleNewChat}>Start Chat</button>
                {interests.map((interest, index) => (
                    <div key={index}>{interest}</div>
                ))}
            </section>
        </main>
    )
}