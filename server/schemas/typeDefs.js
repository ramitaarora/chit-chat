const typeDefs = `
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        fullName: String
        bio: String
        photo: String
        interest1: String
        interest2: String
        interest3: String
        friends: [User]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Chat {
        _id: ID
        text: [TextChat]
        user1: User
        user2: User
    }

    type TextChat {
        sender: ID
        textContent: String
    }

    type Query {
        users: [User]
        user(_id: ID!): User
        chat(_id: ID!): Chat
        chatExists(user2: ID!): Chat
        me: User
    }

    type Mutation {
        users: User
        addUser(username: String!, email: String!, password: String!): Auth
        newChat(user2: ID!): Chat
        login(username: String!, password: String!): Auth
        editUser(username: String, fullName: String, bio: String, photo: String, interest1: String, interest2: String, interest3: String): User
        addFriend(friend: ID): User
        saveMessage(_id: ID!, sender: ID, textContent: String): Chat
    }
`;

module.exports = typeDefs;
