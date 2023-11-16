import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            bio
            email
            friends
            fullName
            interests
            password
            photo
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
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
        }
    }
`

export const EDIT_USER = gql`
    mutation editUser {
        editUser {
        _id
        username
        fullName
        bio
        photo
        friends
        interests
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