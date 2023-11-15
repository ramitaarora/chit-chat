const db = require('../config/connection');
const {User, Chat } = require('../models');
const cleanDB = require('./cleanDB');

const userData = require('./userData.json');

db.once('open', async () => {
  try {

    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < userSeeds.length; i++) {
      const { _id, userName } = await userData.create(userSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: userName },
        {
          $addToSet: {
            username: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
