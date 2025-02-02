import User from 'models/user';
import { userFactory } from 'factories/user.factory';
import seedable from 'seeders/seedable';

const seedUsers = async () => {
  await seedable( async() => {
    const users = Array.from({length: 100}, () => userFactory.build());
    await User.bulkCreate(users);
  })
};

export default seedUsers;
