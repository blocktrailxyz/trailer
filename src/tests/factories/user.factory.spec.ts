import { userFactory } from 'factories/user.factory';
import User from 'models/user';

describe('User Factory', () => {
  it('.build', () => {
    const user = userFactory.build();
    expect(user.displayName).toBeDefined();
    expect(user.emojicon).toBeDefined();
  });

  it('.create', async () => {
    const user = await userFactory.create({}, User);
    expect(user.id).toBeDefined();
    expect(user.displayName).toBeDefined();
    expect(user.emojicon).toBeDefined();
  });
});