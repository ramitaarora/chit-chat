const connection = require('../config/connection');
const { User, Chat } = require('../models');
const users = require('./userData');

connection.once('open', async () => {
    console.log('connected');
      // Delete the collections if they exist
      // let userCheck = await connection.db.listUsers({ name: 'users' }).toArray();
      // if (userCheck.length) {
      //   await connection.dropCollection('users');
      // }
  
      // let chatCheck = await connection.db.listCollections({ name: 'chats' }).toArray();
      // if (thoughtCheck.length) {
      //   await connection.dropCollection('chats');
      // }

    await User.collection.insertMany(users);
  
    // Log out the seed data to indicate what should appear in the database
    console.table(users);
    console.info('Seeding complete! 🌱');
    process.exit(0);
  });
