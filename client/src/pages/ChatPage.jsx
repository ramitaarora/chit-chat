import { useParams } from 'react-router-dom';
import OtherUserHeader from '../components/OtherUserHeader';

export default function ChatPage() {

    const { userID } = useParams();

    return (
        <main>
            <OtherUserHeader userID={userID}/>

        </main>
    )
}