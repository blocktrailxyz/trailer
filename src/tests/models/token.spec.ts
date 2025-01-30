import { faker } from "@faker-js/faker/.";
import Token from "models/token";
import { DataTypes } from "sequelize";

describe("models/token", () => {
  it("should define the Token model with correct attributes", () => {
    const attributes = Token.getAttributes();

    expect(attributes.symbol).toBeDefined();
    expect(attributes.symbol.type).toBeInstanceOf(DataTypes.STRING);
    expect(attributes.symbol.allowNull).toBe(false);
    expect(attributes.symbol.unique).toBe(true);

    expect(attributes.name).toBeDefined();
    expect(attributes.name.type).toBeInstanceOf(DataTypes.STRING);
    expect(attributes.name.allowNull).toBe(false);

    expect(attributes.description).toBeDefined();
    expect(attributes.description.type).toBeInstanceOf(DataTypes.TEXT);
    expect(attributes.description.allowNull).toBe(true);

    expect(attributes.tokenRank).toBeDefined();
    expect(attributes.tokenRank.type).toBeInstanceOf(DataTypes.INTEGER);
    expect(attributes.tokenRank.allowNull).toBe(true);

    expect(attributes.warning).toBeDefined();
    expect(attributes.warning.type).toBeInstanceOf(DataTypes.TEXT);
    expect(attributes.warning.allowNull).toBe(true);

    expect(attributes.imageUrl).toBeDefined();
    expect(attributes.imageUrl.type).toBeInstanceOf(DataTypes.STRING);
    expect(attributes.imageUrl.allowNull).toBe(true);

    expect(attributes.chain).toBeDefined();
    expect(attributes.chain.type).toBeInstanceOf(DataTypes.STRING);
    expect(attributes.chain.allowNull).toBe(false);

    expect(attributes.contractAddress).toBeDefined();
    expect(attributes.contractAddress.type).toBeInstanceOf(DataTypes.STRING);
    expect(attributes.contractAddress.allowNull).toBe(false);

    expect(attributes.decimals).toBeDefined();
    expect(attributes.decimals.type).toBeInstanceOf(DataTypes.INTEGER);
    expect(attributes.decimals.allowNull).toBe(false);
    expect(attributes.decimals.defaultValue).toBe(18);

    expect(attributes.totalSupply).toBeDefined();
    expect(attributes.totalSupply.type).toBeInstanceOf(DataTypes.BIGINT);

    expect(attributes.maxSupply).toBeDefined();
    expect(attributes.maxSupply.type).toBeInstanceOf(DataTypes.BIGINT);

    expect(attributes.isVerified).toBeDefined();
    expect(attributes.isVerified.type).toBeInstanceOf(DataTypes.BOOLEAN);
    expect(attributes.isVerified.allowNull).toBe(false);
    expect(attributes.isVerified.defaultValue).toBe(false);
  })

  it("should create a valid token", async () => {
    const contractAddress = `0x${faker.string.hexadecimal({ length: 42,})}`
    const token = await Token.create({
      symbol: "ETH",
      name: "Ethereum",
      chain: "ethereum",
      contractAddress: contractAddress,
    });

    expect(token.id).toBeDefined();
    expect(token.symbol).toBe("ETH");
    expect(token.name).toBe("Ethereum");
    expect(token.chain).toBe("ethereum");
    expect(token.contractAddress).toBe(contractAddress);
    expect(token.createdAt).toBeDefined();
    expect(token.updatedAt).toBeDefined()
  })
})