import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query Query {
    users {
      _id
      bio
      email
      fullName
      interests
      password
      photo
      username
      friends
    }
  }
`

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(_id: $id) {
      _id
      username
      email
      fullName
      bio
      friends
      interests
      photo
    }
  }
`

export const QUERY_ME = gql`
  query me {
    me {
      _id
      bio
      email
      fullName
      interests
      photo
      username
      friends
    }
  }
`

export const QUERY_CHAT = gql`
query chat($id: ID!) {
  chat(_id: $id) {
    text {
      sender
      textContent
    }
    user1 {
      _id
    }
    user2 {
      _id
    }
  }
}
`

export const CHAT_EXISTS = gql`
query chatExists($user2: ID!) {
  chatExists(user2: $user2) {
    _id
    text {
      sender
      textContent
    }
    user1 {
      _id
    }
    user2 {
      _id
    }
  }
}
`