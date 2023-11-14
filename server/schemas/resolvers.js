const { User, Chat } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, { _id }) => {
            return User.findOne({ _id });
        },
        chat: async (parent, { _id }) => {
            return Chat.findOne({ _id });
        }
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = User.create({ username, email, password });
            const token = signToken(user);
            return { token, user }; 
        },
        addChat: async (parent, { text, user1, user2}, context) => {
            if (context.user) {
                const chat = await Chat.create(
                    { $addToSet: {
                        text: []
                    }},
                    { user1: user1 },
                    { user2: user2 }
                )
            }
            throwAuthenticationError;
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw AuthenticationError;
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw AuthenticationError;
            }
      
            const token = signToken(user);
      
            return { token, user };
          },
        editUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: args._id},
                    { email: args.email},
                    { bio: args.bio },
                    { photo: args.photo },
                    { $addToSet: {
                        interests: [args.interests]
                    }},
                    { new: true, runValidators: true },
                )
            }
        },
        addToChat: async (parent, args) => {
            return Chat.findOneAndUpdate(
                { _id: args._id },

            )
        }
    }
}

module.exports = resolvers;
