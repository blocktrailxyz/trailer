
import User from 'models/user';
import Authentication from 'models/authentication';
import { authenticationWithUserFactory } from 'factories/authentication.factory';

jest.mock('models/user');
jest.mock('models/authentication');

describe('validUserFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a valid user and authentication in the database', async () => {
    const mockUser = { id: 'user-uuid', displayName: 'Alice' };
    const mockAuth = { id: 123, provider: 'google', providerId: 'google-id' };

    (User.create as jest.Mock).mockResolvedValue(mockUser);
    (Authentication.create as jest.Mock).mockResolvedValue(mockAuth);

    const { user, authentication } = await authenticationWithUserFactory.create(
      { displayName: 'Alice' },
      { provider: 'google', providerId: 'google-id' }
    );

    expect(User.create).toHaveBeenCalledWith(
      expect.objectContaining({ displayName: 'Alice' })
    );
    expect(Authentication.create).toHaveBeenCalledWith(
      expect.objectContaining({
        provider: 'google',
        providerId: 'google-id',
        userId: 'user-uuid',
      })
    );

    expect(user).toEqual(mockUser);
    expect(authentication).toEqual(mockAuth);
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
