import { faker } from "@faker-js/faker";
import PortfolioToken from "models/portfolio_token";
import { Factory } from "./factory";
import User from "models/user";
import Portfolio from "models/portfolio";
import Token from "models/token";
import { portfolioWithUserFactory } from "./portfolio.factory";
import { tokenFactory } from "./token.factory";
import { userFactory } from "./user.factory";

export const portfolioTokenFactory = new Factory<Partial<PortfolioToken>>(() => ({
  amount: parseFloat(faker.finance.amount()),
  averageBuyPrice: parseFloat(faker.finance.amount()),
  totalInvested: parseFloat(faker.finance.amount()),
  currentPrice: parseFloat(faker.finance.amount()),
  totalValue: parseFloat(faker.finance.amount()),
  profitLoss: parseFloat(faker.finance.amount()),
  buyCount: faker.number.int({ min: 0, max: 100 }),
  sellCount: faker.number.int({ min: 0, max: 100 }),
  lastTradeDate: faker.date.between({ from: "2022-01-01", to: new Date() }), // Random date within last 2 years

}));

export const portfolioTokenUserFactory = {
  async create(
    userOverrides?: Partial<User>,
    portfolioOverrides?: Partial<Portfolio>,
    tokenOverrides?: Partial<Token>
  ): Promise<{
    user: Partial<User>;
    portfolio: Partial<Portfolio>;
    token: Partial<Token>;
    portfolioToken: Partial<PortfolioToken>;
  }> {
    // Fetch or create User
    const user = (userOverrides?.id
      ? await User.findByPk(userOverrides.id)
      : await userFactory.create(userOverrides, User)) as User;

    if (!user) {
      throw new Error("User not found");
    }

    // Fetch or create Portfolio
    const { portfolio } = (portfolioOverrides?.id
      ? { portfolio: await Portfolio.findByPk(portfolioOverrides.id) }
      : await portfolioWithUserFactory.create({id: user.id}, portfolioOverrides));

    if (!portfolio) {
      throw new Error("Portfolio not found");
    }

    // Fetch or create Token
    const token = tokenOverrides?.id
      ? await Token.findByPk(tokenOverrides.id)
      : await tokenFactory.create(tokenOverrides, Token);

    if (!token) {
      throw new Error("Token not found");
    }

    // Fetch or create PortfolioToken
    let portfolioToken = await PortfolioToken.findOne({
      where: {
        portfolioId: portfolio.id,
        tokenId: token.id,
        userId: user.id,
      },
    });

    if (!portfolioToken) {
      portfolioToken = await portfolioTokenFactory.create({
        portfolioId: portfolio.id,
        tokenId: token.id,
        userId: user.id,
      }, PortfolioToken) as PortfolioToken;
    }

    return { user, portfolio, token, portfolioToken };
  },
};
