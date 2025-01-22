// src/factories/user.factory.ts
// import { Factory } from 'fishery';
// import { faker } from '@faker-js/faker';
// import  User from 'models/user'; // Adjust the path to your User model

// export const userFactory = Factory.define<Partial<User>>(() => ({
//   id: undefined, // Auto-incremented by the database
//   displayName: faker.person.fullName(),
//   emojicon: faker.internet.emoji(),
//   createdAt: new Date(),
//   updatedAt: new Date(),
// }));


// src/factories/user.factory.ts
import { Factory } from './factory';
import { faker } from '@faker-js/faker';
import User from 'models/user';

export const userFactory = new Factory<Partial<User>>(() => ({
  displayName: faker.person.fullName(),
  emojicon: faker.internet.emoji(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));


// import { userFactory } from 'factories/user.factory';
// import User from 'models/user';

// describe('User Factory', () => {
//   it('.build', () => {
//     const user = userFactory.build();
//     expect(user.displayName).toBeDefined();
//     expect(user.emojicon).toBeDefined();
//   });

//   it('.create', async () => {
//     const user = await userFactory.create({}, User);
//     expect(user.id).toBeDefined();
//     expect(user.displayName).toBeDefined();
//     expect(user.emojicon).toBeDefined();
//   });
// });