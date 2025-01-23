import OauthAuthenticator from 'services/oauth_authenticator';

import { OauthProvider } from 'models/authentication';
import axios from 'axios';
import User from 'models/user';
import Authentication from 'models/authentication';
import { faker } from '@faker-js/faker/.';
import { authenticationWithUserFactory } from 'factories/authentication.factory';

jest.mock('axios');

describe('OauthAuthenticator', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should authenticate an existing user', async () => {
    const { user, authentication } = await authenticationWithUserFactory.create({}, {});

    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: {
        sub: authentication.providerId,
        name: "John Doe",
        given_name: "John",
        family_name: "Doe",
        picture: "https://lh3.googleusercontent.com/a-/AOh14GjZmeYwTxDFyRpjBjsYb0gCEZ5qFz4ADsHF7Uj=s96-c",
        email: "johndoe@gmail.com",
        email_verified: true,
        locale: "en",
      },
    });

    const result = await OauthAuthenticator.call({
      provider: OauthProvider.Google,
      token: 'valid-google-token',
    });

    expect(axios.get).toHaveBeenCalledWith('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer valid-google-token` },
    });

    expect(result.user.toJSON()).toEqual((user as User).toJSON())
    expect(result.authentication.get()).toEqual((authentication as Authentication).get())
    expect(result.isNewUser).toEqual(false)
  });

  it('should register a new user if no authentication exists', async () => {
    const mockGoogleApiResponse = { sub: 'new-google-id' };

    // Mock Google API response
    (axios.get as jest.Mock).mockResolvedValueOnce({
      data: mockGoogleApiResponse,
    });

    const options = {
      provider: OauthProvider.Google,
      token: 'valid-google-token',
      displayName: faker.person.fullName(),
      emojicon: faker.internet.emoji(),
    }
    const result = await OauthAuthenticator.call(options);

    expect(axios.get).toHaveBeenCalledWith('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer valid-google-token` },
    });

    expect(result.isNewUser).toEqual(true)
    expect(result.user.displayName).toEqual( options.displayName)
    expect(result.user.emojicon).toEqual( options.emojicon)
    expect(result.authentication.provider).toEqual(OauthProvider.Google)
    expect(result.authentication.userId).toEqual(result.user.id)
    expect(result.authentication.providerId).toEqual(mockGoogleApiResponse.sub)
  });

  it('should throw an error for an invalid provider', async () => {
    await expect(
      OauthAuthenticator.call({
        provider: 'invalid' as OauthProvider,
        token: 'some-token',
      })
    ).rejects.toThrow('Invalid provider');
  });

  it('should throw an error if fetching the provider ID fails', async () => {
    // Mock a failure in the Google API request
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error('Request failed'));

    await expect(
      OauthAuthenticator.call({
        provider: OauthProvider.Google,
        token: 'invalid-google-token',
      })
    ).rejects.toThrow('Failed to fetch provider ID');
  });
});
