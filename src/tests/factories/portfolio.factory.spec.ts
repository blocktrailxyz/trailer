import User from "models/user";
import { portfolioWithUserFactory } from "factories/portfolio.factory";
import { userFactory } from "factories/user.factory";

describe("PortfolioFactory", () => {
  describe("portfolioWithUserFactory", () => {
    it("should create a User and Portfolio successfully", async () => {
      const { user, portfolio } = await portfolioWithUserFactory.create();

      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("createdAt");
      expect(portfolio).toHaveProperty("id");
      expect(portfolio.userId).toEqual(user.id);
    });

    it("should fetch an existing User if `id` is provided", async () => {
      const existingUser = await userFactory.create({}, User);

      const { user, portfolio } = await portfolioWithUserFactory.create({ id: existingUser.id });

      expect(user.id).toBe(existingUser.id); // Should use existing User
      expect(portfolio.userId).toBe(existingUser.id);
    });

    it("should create a Portfolio with specific properties", async () => {
      const { portfolio } = await portfolioWithUserFactory.create({}, { name: "Custom Portfolio", main: true });

      expect(portfolio.name).toBe("Custom Portfolio");
      expect(portfolio.main).toBe(true);
    });

    it("should build a User and Portfolio in memory without saving", () => {
      const { user, portfolio } = portfolioWithUserFactory.build();

      expect(portfolio).toHaveProperty("name");
      expect(portfolio.userId).toBe(user.id);
    });
  });
});