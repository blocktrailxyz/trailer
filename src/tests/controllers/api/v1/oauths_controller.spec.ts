import { faker } from '@faker-js/faker/.';
import { authenticationWithUserFactory } from 'factories/authentication.factory';
import fastify from 'fastify';
import Authentication from 'models/authentication';
import User from 'models/user';
import routes from "routes/index_route";
import OauthAuthenticator from 'services/oauth_authenticator';

// Mock OauthAuthenticator service
jest.mock('services/oauth_authenticator', () => ({
  call: jest.fn(),
}));

const mockedOauthAuthenticator = OauthAuthenticator as jest.Mocked<typeof OauthAuthenticator>;

describe(`OauthsController`, () => {
  const app = fastify();

  beforeAll(async () => {
    app.register(routes);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 200 with user details for an existing user', async () => {
    const { user, authentication } = await authenticationWithUserFactory.create({}, {});
    const mockResponse = {
      user: (user as User),
      authentication: (authentication as Authentication),
      isNewUser: false,
    };

    mockedOauthAuthenticator.call.mockResolvedValue(mockResponse);

    const payload = {
      provider: 'Google',
      token: 'valid_token',
      displayName: faker.person.fullName(),
      emojicon: faker.internet.emoji()
    }

    // mockRequest

    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/oauths',
      payload: payload,
    });

    expect(response.statusCode).toBe(200);
    expect(mockedOauthAuthenticator.call).toHaveBeenCalledWith(payload);
  });

  it('should return 200 with user details for a new user', async () => {
    const { user, authentication } = await authenticationWithUserFactory.create({}, {});
    const mockResponse = {
      user: (user as User),
      authentication: (authentication as Authentication),
      isNewUser: false,
    };

    mockedOauthAuthenticator.call.mockResolvedValue(mockResponse);

    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/oauths',
      payload: {
        provider: 'GitHub',
        token: 'another_valid_token',
        displayName: 'Jane Doe',
        emojicon: '😊',
      },
    });

    expect(response.statusCode).toBe(200);
    expect(mockedOauthAuthenticator.call).toHaveBeenCalledWith({
      provider: 'GitHub',
      token: 'another_valid_token',
      displayName: 'Jane Doe',
      emojicon: '😊',
    });
  });

  it('should return 400 if provider or token is missing', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/oauths',
      payload: {
        provider: 'Google',
      },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toEqual({
      errors: [
        {
          "detail": "Provider and token are required",
          "status": "400",
          "title": "Bad Request",
        },
      ],
    });
    expect(mockedOauthAuthenticator.call).not.toHaveBeenCalled();
  });

  it('should return 500 if an error occurs in the service', async () => {
    mockedOauthAuthenticator.call.mockRejectedValue(new Error('Service Error'));

    const response = await app.inject({
      method: 'POST',
      url: '/api/v1/oauths',
      payload: {
        provider: 'Google',
        token: 'invalid_token',
      },
    });

    expect(response.statusCode).toBe(500);
    expect(response.json()).toEqual({
      errors: [{
        "detail": "Service Error",
        "status": "500",
        "title": "Internal Server Error",
      }]
    });
    expect(mockedOauthAuthenticator.call).toHaveBeenCalledWith({
      provider: 'Google',
      token: 'invalid_token',
      displayName: undefined,
      emojicon: undefined,
    });
  });
});
