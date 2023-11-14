const typeDefs = `
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
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
        text: [Object]!
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
        login(email: String!, password: String!): Auth
        editUser(_id: ID!, email: String, bio: String, photo: String, interests: Array): User
        saveChat(_id: ID!, text: Object): Chat
    }
`;

module.exports = typeDefs;
