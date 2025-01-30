import PortfolioToken from "models/portfolio_token";
import Portfolio from "models/portfolio";
import User from "models/user";
import Token from "models/token";
import { portfolioTokenUserFactory } from "factories/portfolio_token.factory";
import { userFactory } from "factories/user.factory";
import { tokenFactory } from "factories/token.factory";
import { portfolioWithUserFactory } from "factories/portfolio.factory";

describe("PortfolioTokenFactory", () => {
  describe("portfolioTokenUserFactory", () => {

    it("should create a User, Portfolio, Token, and PortfolioToken successfully", async () => {
      const { user, portfolio, token, portfolioToken } = await portfolioTokenUserFactory.create({}, {}, {});

      expect(user).toBeInstanceOf(User);
      expect(user).toHaveProperty("id");

      expect(portfolio).toBeInstanceOf(Portfolio);
      expect(portfolio).toHaveProperty("id");

      expect(token).toBeInstanceOf(Token);
      expect(token).toHaveProperty("id");
      expect(portfolioToken).toHaveProperty("id");

      expect(portfolioToken.userId).toBe(user.id);
      expect(portfolioToken.portfolioId).toBe(portfolio.id);
      expect(portfolioToken.tokenId).toBe(token.id);
    });

    it("should fetch an existing User if `id` is provided", async () => {
      const existingUser = await userFactory.create({}, User);

      const { user, portfolio, portfolioToken } = await portfolioTokenUserFactory.create({ id: existingUser.id });

      expect(user.id).toBe(existingUser.id); // Should use existing User
      expect(portfolio.userId).toBe(existingUser.id);
      expect(portfolioToken.userId).toBe(existingUser.id);
    });

    it("should fetch an existing Portfolio if `id` is provided", async () => {
      const {portfolio} = await portfolioWithUserFactory.create({}, {});

      const { portfolio: newPortfolio } = await portfolioTokenUserFactory.create({}, { id: portfolio.id });

      expect(portfolio.id).toBe(newPortfolio.id);
    });

    it("should fetch an existing Token if `id` is provided", async () => {
      const existingToken = await tokenFactory.create({}, Token);

      const { token } = await portfolioTokenUserFactory.create({}, {}, { id: existingToken.id });

      expect(token.id).toBe(existingToken.id);
    });

    it("should not create duplicate PortfolioToken records", async () => {
      const { user, portfolio, token, portfolioToken } = await portfolioTokenUserFactory.create();
       const count = await PortfolioToken.count();

      // Attempt to create the same PortfolioToken again
      const { portfolioToken: secondPortfolioToken } = await portfolioTokenUserFactory.create({ id: user.id }, { id: portfolio.id }, { id: token.id });

      // Ensure the portfolioToken wasn't duplicated
      expect(secondPortfolioToken.id).toBe(portfolioToken.id);

      const finalCount = await PortfolioToken.count();
      expect(finalCount).toBe(count);
    });

    it("should throw an error if User is not found", async () => {
      await expect(portfolioTokenUserFactory.create({ id: "non-existent-user" })).rejects.toThrow();
    });

    it("should throw an error if Portfolio is not found", async () => {
      await expect(portfolioTokenUserFactory.create({}, { id: "non-existent-portfolio" })).rejects.toThrow();
    });

    it("should throw an error if Token is not found", async () => {
      await expect(portfolioTokenUserFactory.create({}, {}, { id: "non-existent-token" })).rejects.toThrow();
    });
  });
});
