import Fastify from "fastify";
import BlockchainAuthenticator from "services/blockchain_authenticator";
import User from "models/user";
import { authenticationWithUserFactory } from "factories/authentication.factory";
import { AuthResult } from "services/oauth_authenticator";
import Authentication from "models/authentication";
import routes from "routes/index_route";

describe("POST /api/v1/signatures", () => {
  const fastify = Fastify();

  beforeAll(async () => {
    fastify.register(routes)
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it("should authenticate user and return JSON:API response", async () => {
    // Mock auth parameters
    const authParams = {
      walletAddress: "0x123456789abcdef",
      chain: "sui",
      signature: "mock_signature",
    };

    // Mock user object
    const {user, authentication } = await authenticationWithUserFactory.create({}, {})
    const authResult: AuthResult = { user: user as User, authentication: authentication as Authentication, isNewUser: false };

    // Mock BlockchainAuthenticator
    jest.spyOn(BlockchainAuthenticator, "call").mockResolvedValue(authResult);

    // Make request
    const response = await fastify.inject({
      method: "POST",
      url: "/api/v1/signatures",
      payload: authParams,
    });

    // Check response status
    expect(response.statusCode).toBe(200);

    // Parse response JSON
    const responseData = JSON.parse(response.body);

    // Validate response format (JSON:API)
    expect(responseData).toHaveProperty("data");
    expect(responseData.data).toHaveProperty("type", "users");
    expect(responseData.data).toHaveProperty("id", user.id);
    expect(responseData.data.attributes).toHaveProperty("displayName", user.displayName);
    expect(responseData.data.attributes).toHaveProperty("emojicon", user.emojicon);

    // Cleanup mocks
    jest.restoreAllMocks();
  });

  it("/api/v1/signatures: should return an error for missing walletAddress", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/api/v1/signatures",
      payload: { chain: "sui", signature: "mock_signature" },
    });

    const responseData = JSON.parse(response.body);
    const error = {"errors":[{"status":"500","title":"Internal Server Error","detail":"Invalid token: JsonWebTokenError: jwt must be provided"}]}

    expect(responseData).toEqual(error);
    expect(response.statusCode).toBe(500);

  });

  it("sign should return an error for invalid signature", async () => {
    jest.spyOn(BlockchainAuthenticator, "call").mockRejectedValue(new Error("Invalid signature"));

    const response = await fastify.inject({
      method: "POST",
      url: "/api/v1/signatures",
      payload: {
        walletAddress: "0x123456789abcdef",
        chain: "sui",
        signature: "invalid_signature",
      },
    });

    const responseData = JSON.parse(response.body);
    const error =  {"errors":[{"status":"500","title":"Internal Server Error","detail":"Invalid signature"}]}

    expect(responseData).toEqual(error);
    expect(response.statusCode).toBe(500);
  });
});
