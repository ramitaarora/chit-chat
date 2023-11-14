const typeDefs = `
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        fullName: String
        bio: String
        photo: String
        interests: [String]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Chat {
        _id: ID
        text: Array!
        user1: User!
        user2: User!
    }

    type Query {
        users: [User]
        user(_id: ID!): User
        chat(_id: ID!): Chat
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        newChat(text: Object, user1: String!, user2: String!)
        login(email: String!, password: String!): Auth
        editUser(fullName: String, bio: String, photo: String, interests: Array): User
        saveChat(_id: ID!, text: Object): Chat
    }
`;

module.exports = typeDefs;
