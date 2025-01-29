import Fastify from "fastify";
import { create } from "controllers/api/v1/challenges"; // Adjust the path as necessary

describe("POST /api/v1/challenges", () => {
  const fastify = Fastify();

  beforeAll(async () => {
    fastify.post("/api/v1/challenges", create);
    await fastify.ready();
  });

  afterAll(async () => {
    await fastify.close();
  });

  it("should return a signed challenge token", async () => {
    // Mock Data
    const walletAddress = "0x123456789abcdef"; // Example Wallet Address
    const chain = "sui"; // Example Blockchain (SUI in this case)

    // Make request
    const response = await fastify.inject({
      method: "POST",
      url: "/api/v1/challenges",
      payload: { walletAddress, chain },
    });

    // Check response status
    expect(response.statusCode).toBe(200);

    // Parse response JSON
    const responseData = JSON.parse(response.body);
    // // Verify response structure
    expect(responseData['data']).toHaveProperty("id");
    expect(responseData['data']).toHaveProperty("attributes");
    expect(responseData['data']['attributes']).toHaveProperty("token");
    expect(responseData['data']['attributes']).toHaveProperty("message");

  });

  it("should return an error for missing walletAddress", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/api/v1/challenges",
      payload: { chain: "sui" },
    });
    const responseData = JSON.parse(response.body);

    const error = {"errors":[{"status":"400","title":"Bad Request","detail":"Wallet Address and Chain are required"}]}
    expect(responseData).toEqual(error); // Bad Request
  });

  it("should return an error for missing chain", async () => {
    const response = await fastify.inject({
      method: "POST",
      url: "/api/v1/challenges",
      payload: { walletAddress: "0x123456789abcdef" },
    });

    const responseData = JSON.parse(response.body);

    const error = {"errors":[{"status":"400","title":"Bad Request","detail":"Wallet Address and Chain are required"}]}
    expect(responseData).toEqual(error); // Bad Request
  });

});