import { Factory } from './factory';
import { faker } from '@faker-js/faker';
import User from 'models/user';

export const userFactory = new Factory<Partial<User>>(() => ({
  id: faker.string.uuid(),
  displayName: faker.person.fullName(),
  emojicon: faker.internet.emoji(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));