import { portfolioWithUserFactory } from "factories/portfolio.factory";
import Portfolio from "models/portfolio";
import { DataTypes } from "sequelize";

describe("Portfolio", () => {
  it("should define the model with correct attributes", () => {
    const attributes = Portfolio.getAttributes();

    expect(attributes.userId).toBeDefined();
    expect(attributes.userId.type).toBeInstanceOf(DataTypes.UUID);
    expect(attributes.userId.allowNull).toBe(false);

    expect(attributes.name).toBeDefined();
    expect(attributes.name.type).toBeInstanceOf(DataTypes.STRING);
    expect(attributes.name.allowNull).toBe(false);

    expect(attributes.main).toBeDefined();
    expect(attributes.main.type).toBeInstanceOf(DataTypes.BOOLEAN);
    expect(attributes.main.allowNull).toBe(false);
    expect(attributes.main.defaultValue).toBe(false);
  });

  it("should create a valid portfolio", async () => {
    const { user, portfolio } = await portfolioWithUserFactory.create({}, {});

    expect(user).toBeDefined();

    expect(portfolio).toBeDefined();
    expect(portfolio.userId).toBe(user.id);
    expect(portfolio.name).toBeDefined();
    expect(portfolio.main).toBeDefined();
  })
});