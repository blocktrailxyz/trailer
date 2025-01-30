
import User from 'models/user';
import Authentication from 'models/authentication';
import { authenticationWithUserFactory } from 'factories/authentication.factory';
import { DataTypes } from 'sequelize';

describe('models/authentication', () => {
  it('should have correct attributes', async () => {
    const attributes = Authentication.getAttributes();
    expect(attributes.id).toBeDefined();
    expect(attributes.id.type).toBeInstanceOf(DataTypes.UUID);

    expect(attributes.userId).toBeDefined();
    expect(attributes.userId.type).toBeInstanceOf(DataTypes.UUID);
  });

  it('should create a valid user and authentication in the database', async () => {
    const { user, authentication } = await authenticationWithUserFactory.create(
      { displayName: 'Alice' },
      { provider: 'google', providerId: 'google-id' }
    );

    expect(user).toBeInstanceOf(User);
    expect(authentication).toBeInstanceOf(Authentication);
  });

  it('should build a valid user and authentication in memory', () => {
    const { user, authentication } = authenticationWithUserFactory.build(
      { displayName: 'Alice Doe' },
      { provider: 'github', providerId: 'github-id-456' }
    );

    expect(user).toMatchObject({ displayName: 'Alice Doe' });
    expect(authentication).toMatchObject({
      provider: 'github',
      providerId: 'github-id-456',
    });
  });
});
