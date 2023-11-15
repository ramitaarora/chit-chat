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
      fullName
      bio
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