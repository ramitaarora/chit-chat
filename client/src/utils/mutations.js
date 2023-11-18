import { gql } from '@apollo/client';

// export const ADD_USER = gql`
//     mutation addUser($username: String!, $fullName: String!, $email: String!, $password: String!) {
//         addUser(username: $username, fullName: $fullName, email: $email, password: $password) {
//         token
//         user {
//             _id
//             bio
//             email
//             friends
//             fullName
//             interests
//             password
//             photo
//             username
//         }
//         }
//     }
// `

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            username
        }
        }
    }
`

export const NEW_CHAT = gql`
    mutation NewChat($user2: ID!) {
        newChat(user2: $user2) {
        _id
        user1 {
            _id
        }
        user2 {
            _id
        }
        }
    }
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`

export const EDIT_USER = gql`
    mutation editUser($username: String, $fullName: String, $bio: String, $photo: String, $interests: [String]) {
        editUser(username: $username, fullName: $fullName, bio: $bio, photo: $photo, interests: $interests) {
        username
        fullName
        bio
        photo
        interests
        }
    }
`

export const ADD_FRIEND = gql`
    mutation addFriend($friend: ID!) {
        addFriend(friend: $friend) {
        _id
        friends
        }
    }
`

export const SAVE_MESSAGE = gql`
    mutation saveMessage($id: ID!, $sender: ID, $textContent: String) {
        saveMessage(_id: $id, sender: $sender, textContent: $textContent) {
        text {
                sender
                textContent
            }
        }
    }
`