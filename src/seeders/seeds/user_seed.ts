import sequelize from 'config/database';
import User from 'models/user';
import { userFactory } from 'factories/user.factory';

const seedUsers = async () => {
  try {
    console.log('Connecting to the database...');
    await sequelize.authenticate();
    await sequelize.sync(); // Ensure the tables exist

    console.log('Generating users...');

    console.log('Inserting users into the database...');
    const users = Array.from({length: 100}, () => userFactory.build());
    await User.bulkCreate(users);

    console.log('Successfully seeded 100 users!');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await sequelize.close();
  }
};

export default seedUsers;
