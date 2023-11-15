import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';

export default function FriendHeader({ userID }) {

    const { data } = useQuery(QUERY_USER, {
        variables: { _id: userID }
    });

    const username = data?.username;

    return (
        <header>{username}</header>
    )
}