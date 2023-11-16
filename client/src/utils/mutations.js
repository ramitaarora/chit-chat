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
    mutation newChat($user1: String!, $user2: String!, $sender: ID, $textContent: String, $chatId: ID) {
        newChat(user1: $user1, user2: $user2, sender: $sender, textContent: $textContent, chatId: $chatId) {
        text {
            textContent
            sender
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

export const SAVE_CHAT = gql`
    mutation saveChat($id: ID!, $sender: ID, $textContent: String, $chatId: ID) {
        saveChat(_id: $id, sender: $sender, textContent: $textContent, chatId: $chatId) {
        text {
            textContent
            sender
            chatId
        }
        }
    }
`