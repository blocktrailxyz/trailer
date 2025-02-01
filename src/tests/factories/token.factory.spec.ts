import { tokenFactory } from "factories/token.factory";
import Token from "models/token";

describe("TokenFactory", () => {
  it("tokenFactory.create", async() => {
    const token = await tokenFactory.create({}, Token) as Token;

    expect(token.id).toBeDefined();
    expect(token.symbol).toBeDefined();
    expect(token.name).toBeDefined();
    expect(token.chain).toBeDefined();
  })
})