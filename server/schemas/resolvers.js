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
        },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
          },
    },
    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = User.create({ username, email, password });
            const token = signToken(user);
            return { token, user }; 
        },
        newChat: async (parent, { text, user1, user2}, context) => {
            if (context.user) {
                return await Chat.create(
                    { $push: { text: [text] } },
                    { user1: user1 },
                    { user2: user2 }
                )
            }
            throw AuthenticationError;
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
                    { _id: context.user._id},
                    { fullName: args.fullName,
                    bio: args.bio,
                    photo: args.photo,
                    $push: { interests: [args.interests] } },
                    { new: true, runValidators: true },
                )
            }
        },
        saveChat: async (parent, { _id, text }) => {
            return Chat.findOneAndUpdate(
                { _id: _id },
                { $push: { text: [text] } }
            )
        }
    }
}

module.exports = resolvers;
