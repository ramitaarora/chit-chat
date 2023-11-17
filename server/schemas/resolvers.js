const { User, Chat } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find();
        },
        user: async (parent, { _id }) => {
            return User.findOne({ _id }).populate('friends');
        },
        chat: async (parent, { _id }) => {
            return Chat.findOne({ _id });
        },
        chatExists: async (parent, { user1, user2 }) => {
            return Chat.findOne({ $or: [
                { user1, user2 },
                {  user1: user2, user2: user1 },
            ] })
        },
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
          },
    },
    Mutation: {
        addUser: async (parent, { username, fullName, email, password }) => {
            const user = await User.create({ username, fullName, email, password });
            const token = signToken(user);
            return { token, user }; 
        },
        newChat: async (parent, { user2 }, context) => {

            const chat = await Chat.create({
                user1: { _id: context.user._id },
                user2: { _id: user2 },
            })

            return chat;

            // const chatExists = await Chat.findOne({
            //     $or: [
            //         { user1: context.user._id, user2: user2 },
            //         { user1: user2, user2: context.user._id },
            //     ],
            // });

            // if (chatExists) {
            //     return chatExists;
            // }

            // if (!chatExists) {
            //     if (context.user) {
            //         return await Chat.create(
            //             { user1: { _id: context.user._id} },
            //             { user2: { _id: user2 } },
            //         )
            //     } throw AuthenticationError;
            // }
        },
        login: async (parent, { username, password }) => {
            const user = await User.findOne({ username });
      
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
                    { _id: context.user._id },
                    {
                        $set: {
                            fullName: args.fullName,
                            bio: args.bio,
                            photo: args.photo,
                        },
                        $push: {
                            interests: { $each: args.interests || [] },
                        }
                    },
                    { new: true, runValidators: true },
                )
            }
        },
        addFriend: async (parent, args, context) => {
            if (context.user) {
                const user1 = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: {
                            friends: args.friend
                        },
                    },
                    { new: true, runValidators: true }
                );

                const user2 = await User.findOneAndUpdate(
                    { _id: args.friend },
                    {
                        $push: {
                            friends: context.user._id
                        },
                    },
                    { new: true, runValidators: true }
                );

                return user1;
            }
        },
        saveMessage: async (parent, { _id, sender, textContent}, contenxt) => {
            if (context.user) {
                return Chat.findOneAndUpdate(
                    { _id: _id },
                    { $push: { text:
                        { 
                            sender: sender,
                            textContent: textContent,
                        }
                    } }
                )
            }
        }
    }
}

module.exports = resolvers;
