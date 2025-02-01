import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import supertest from "supertest";
import registerCors from "middlewares/cors_registration_middleware";

describe("registerCors Middleware", () => {
  let fastify: FastifyInstance;
  const host = "http://example.com"

  beforeAll(async () => {
    fastify = Fastify();

    // Mock environment variable
    process.env.FRONTEND_HOST = host;

    // Register CORS middleware
    registerCors(fastify);

    // Sample test route
    fastify.get("/", async (req: FastifyRequest, reply: FastifyReply) => {
      // return { message: "Hello, CORS!" };
      return reply.send({ message: "Hello, CORS!"});
    });

    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  test("should allow requests with no origin (curl, mobile apps)", async () => {
    const response = await supertest(fastify.server)
      .get("/")
      .set("Origin", "")
      .expect(200);

    expect(response.body).toEqual({ message: "Hello, CORS!" });
  });

  test("should allow requests from FRONTEND_HOST", async () => {
    const response = await supertest(fastify.server)
      .get("/")
      .set("Origin", host)
      .expect(200);

    expect(response.body).toEqual({ message: "Hello, CORS!" });
  });

  test("should reject requests from disallowed origins", async () => {
    const response = await supertest(fastify.server)
      .get("/")
      .set("Origin", "http://unauthorized.com");

    expect(response.status).toBe(500);
    expect(response.text).toContain("Not allowed by CORS");
  });

  test("should include credentials in CORS headers", async () => {
    const response = await supertest(fastify.server)
      .get("/")
      .set("Origin", "http://example.com")
      .expect(200);

    expect(response.headers["access-control-allow-credentials"]).toBe("true");
  });
});
