import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import Header from '../components/Header';

export default function AddFriendPage() {

    const { loading, data } = useQuery(QUERY_USERS);

    const users = 

    return(
        <main>
            <Header />
            <div>Add Friends</div>
        </main>
    )
}