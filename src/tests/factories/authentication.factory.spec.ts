import Authentication, { OauthProvider } from 'models/authentication';
import { authenticationWithUserFactory, authenticationFactory } from 'factories/authentication.factory';
import { userFactory } from 'factories/user.factory';
import User from 'models/user';


describe('authenticationWithUserFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('build', () => {
    it('should build a User and Authentication in memory', () => {
      const { user, authentication } = authenticationWithUserFactory.build(
        { displayName: 'Alice Doe' },
        { provider: OauthProvider.GitHub, providerId: 'github-id-123' }
      );

      expect(user).toMatchObject({
        displayName: 'Alice Doe',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });

      expect(authentication).toMatchObject({
        provider: OauthProvider.GitHub,
        providerId: 'github-id-123',
        userId: user.id,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should use default values when no overrides are provided', () => {
      const { user, authentication } = authenticationWithUserFactory.build();

      expect(user).toHaveProperty('displayName');
      expect(user).toHaveProperty('createdAt');
      expect(user).toHaveProperty('updatedAt');

      expect(authentication).toHaveProperty('provider', OauthProvider.Google);
      expect(authentication).toHaveProperty('providerId');
      expect(authentication).toHaveProperty('createdAt');
      expect(authentication).toHaveProperty('updatedAt');
    });
  });

  describe('create', () => {
    it('should create a User and Authentication in the database', async () => {

      const { user, authentication } = await authenticationWithUserFactory.create(
        { displayName: 'Alice Doe' },
        { provider: OauthProvider.GitHub, providerId: 'github-id-123' }
      );

      expect(user.displayName).toEqual('Alice Doe');
      expect(authentication.provider).toEqual(OauthProvider.GitHub);
    });

    it('should use default values when no overrides are provided', async () => {
      const { user, authentication } = await authenticationWithUserFactory.create();
      expect(user.displayName).toBeDefined();
      expect(authentication.provider).toEqual(OauthProvider.Google);
    });
  });
});

describe('authenticationFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('build', () => {
    it('should build an Authentication object in memory', () => {
      const authentication = authenticationFactory.build({
        provider: OauthProvider.GitHub,
        providerId: 'github-id-123',
      });

      expect(authentication).toMatchObject({
        provider: OauthProvider.GitHub,
        providerId: 'github-id-123',
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });

    it('should use default values when no overrides are provided', () => {
      const authentication = authenticationFactory.build();

      expect(authentication).toHaveProperty('provider', OauthProvider.Google);
      expect(authentication).toHaveProperty('providerId');
      expect(authentication.providerId).toBeDefined();
      expect(authentication).toHaveProperty('createdAt', expect.any(Date));
      expect(authentication).toHaveProperty('updatedAt', expect.any(Date));
    });
  });

  describe('create', () => {
    it('should create an Authentication record in the database', async () => {
      const user = await userFactory.create({}, User);

      const authentication = await authenticationFactory.create(
        { provider: OauthProvider.Telegram, providerId: 'telegram-id-456', userId: user.id },
        Authentication
      );

      expect(authentication.provider).toEqual(OauthProvider.Telegram);
      expect(authentication.providerId).toEqual('telegram-id-456');
      expect(authentication.userId).toEqual(user.id);
    });
  });
});
