import User from 'models/user'; // Adjust the import based on your project structure
import { DataTypes } from 'sequelize';

describe('models/user', () => {
  it('should define the User model with correct attributes', () => {
    const attributes = User.getAttributes();

    expect(attributes.id).toBeDefined();
    expect(attributes.id.type).toBeInstanceOf(DataTypes.UUID);

    expect(attributes.displayName).toBeDefined();
    expect(attributes.displayName.type).toBeInstanceOf(DataTypes.STRING);
    expect(attributes.displayName.allowNull).toBe(false);

    expect(attributes.emojicon).toBeDefined();
    expect(attributes.emojicon.type).toBeInstanceOf(DataTypes.STRING);
    expect(attributes.emojicon.allowNull).toBe(false);

    expect(attributes.createdAt).toBeDefined();
    expect(attributes.createdAt.type).toBeInstanceOf(DataTypes.DATE);
    expect(attributes.createdAt.allowNull).toBe(false);

    expect(attributes.updatedAt).toBeDefined();
    expect(attributes.updatedAt.type).toBeInstanceOf(DataTypes.DATE);
    expect(attributes.updatedAt.allowNull).toBe(false);
  });

  it('should create a valid user', async () => {
    const user = await User.create({
      displayName: 'John Doe',
      emojicon: '🙂',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    expect(user.id).toBeDefined();
    expect(user.displayName).toBe('John Doe');
    expect(user.emojicon).toBe('🙂');
    expect(user.createdAt).toBeDefined();
    expect(user.updatedAt).toBeDefined();
    expect(user.authTokenVersion).toBeDefined();
  });

  it('should fail to create a user without displayName', async () => {
    await expect(
      User.create({
        emojicon: '🙂',
      })
    ).rejects.toThrow(/notNull/);
  });

  it('should fail to create a user without emojicon', async () => {
    await expect(
      User.create({
        displayName: 'John Doe',
      })
    ).rejects.toThrow(/notNull/);
  });

  it('should allow updates to user attributes', async () => {
    const user = await User.create({
      displayName: 'John Doe',
      emojicon: '🙂',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    user.displayName = 'Jane Doe';
    await user.save();

    const updatedUser = await User.findByPk(user.id);
    expect(updatedUser?.displayName).toBe('Jane Doe');
  });
});
