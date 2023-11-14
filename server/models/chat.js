const {Schema, model} = require('mongoose')

const chatSchema = new Schema ({
    text: {
        type: Array,
        required: true,
    },
    user1: {
        type: String,
        required: true,
    },
    user2: {
        type: String,
        required: true,
    },
});

const Chat = model('Chat', chatSchema);

module.exports = Chat;