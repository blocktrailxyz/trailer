import { userFactory } from "factories/user.factory";
import User from "models/user";

describe('User Factory', () => {
  it('.build user', () => {
    const user = userFactory.build();

    expect(user.displayName).toBeDefined();
    expect(user.emojicon).toBeDefined();
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
  });

  it('.create user', async () => {
    const user = await userFactory.create({}, User);

    // e7abf6c5-fa2e-4527-83bc-8e7c91d14c30
    expect(user.id).toBeDefined();
    expect(user.displayName).toBeDefined();
    expect(user.emojicon).toBeDefined();
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
  });
});