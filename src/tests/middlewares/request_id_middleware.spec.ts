import Fastify, { FastifyInstance } from "fastify";
import supertest from "supertest";
import requestIdMiddleware from "middlewares/request_id_middleware";

describe("requestIdMiddleware", () => {
  let fastify: FastifyInstance;

  beforeAll(async () => {
    fastify = Fastify();

    // Register middleware
    requestIdMiddleware(fastify);

    // Sample test route
    fastify.get("/", async (request) => {
      return { requestId: request.id };
    });

    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  test("should assign a unique request ID", async () => {
    const response = await supertest(fastify.server).get("/").expect(200);

    expect(response.body).toHaveProperty("requestId");
    expect(response.body.requestId).toMatch(/^req-\d+$/); // Matches "req-{timestamp}"
  });

  test("should assign different request IDs for different requests", async () => {
    const response1 = await supertest(fastify.server).get("/").expect(200);
    const response2 = await supertest(fastify.server).get("/").expect(200);

    expect(response1.body.requestId).not.toBe(response2.body.requestId);
  });
});
