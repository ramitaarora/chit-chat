import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import Header from '../components/Header';

export default function AddFriendPage() {

    const { loading, data } = useQuery(QUERY_USER);

    const users = data?.users || [];

    return (
        <main>
            <Header />
            <div>Add Friends</div>
        </main>
    )
}