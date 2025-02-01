/* eslint-disable @typescript-eslint/no-explicit-any */
import Fastify, { FastifyReply } from "fastify";
import authenticatorMiddleware, { FastifyAuthRequest } from "middlewares/authenticator_middlewar";
import User from "models/user";
import UserAuthTokenSigner from "libs/user_auth_token_signer";
import { userFactory } from "factories/user.factory";
import supertest from "supertest";

describe("authenticatorMiddleware", () => {
  let fastify: any;
  let user: User;
  let accessToken: string;
  let revokedToken: string;

  beforeAll(async () => {
    fastify = Fastify();
    user = await userFactory.create({ authTokenVersion: 10}, User) as User
    // Generate valid JWT token
    accessToken = UserAuthTokenSigner.sign(user);

    user.authTokenVersion = 9
    // Generate a token with an outdated `authTokenVersion`
    revokedToken = UserAuthTokenSigner.sign(user);

    // Define a protected route with the authenticatorMiddleware
    fastify.get("/protected", { preHandler: authenticatorMiddleware }, async (req: FastifyAuthRequest, reply: FastifyReply) => {
      return reply.send({ message: "Access granted", user: req.currentUser });
    });
    await fastify.ready();
  });

  test("should allow access with a valid JWT token", async () => {
    const response = await supertest(fastify.server)
      .get("/protected")
      .set("Authorization", `Bearer ${accessToken}`)
      .expect(200);

    expect(response.body.message).toBe("Access granted");
    expect(response.body.user).toHaveProperty("id", user.id);
    expect(response.body.user).toHaveProperty("displayName", user.displayName);
  });

  test("should return 401 for missing Authorization header", async () => {
    await supertest(fastify.server)
      .get("/protected")
      .expect(401)
      .expect({
        errors: [
          {
            status: '401',
            title: 'Unauthorized',
            detail: 'Bearer token is required in the Authorization header'
          }
        ]
      });
  });

  test("should return 401 for an invalid JWT token", async () => {
    await supertest(fastify.server)
      .get("/protected")
      .set("Authorization", "Bearer")
      .expect(401)
      .expect({
        errors: [
          {
            status: '401',
            title: 'Unauthorized',
            detail: 'Token must be in the format "Bearer <token>"'
          }
        ]
      });
  });

  test("should return 401 for a revoked token", async () => {
    await supertest(fastify.server)
      .get("/protected")
      .set("Authorization", `Bearer ${revokedToken}`)
      .expect(401)
      .expect({
        errors: [ { status: '401', title: 'Unauthorized', detail: 'Unauthorized' } ]
      });
  });
});
