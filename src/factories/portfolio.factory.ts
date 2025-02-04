import { faker } from "@faker-js/faker/.";
import Portfolio from "models/portfolio";
import { Factory } from "./factory";
import User from "models/user";
import { userFactory } from "./user.factory";

export const portfolioFactory = new Factory<Partial<Portfolio>>(() => ({
  name: faker.lorem.words(),
  description: faker.lorem.sentence(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

export const portfolioWithUserFactory = {
  async create(
    userOverrides?: Partial<User>,
    portfolioOverrides?: Partial<Portfolio>
  ): Promise<{ user: Partial<User>; portfolio: Partial<Portfolio> }> {
    // Create a User record

    // Fetch or create User
    const user =
      userOverrides?.id
        ? await User.findByPk(userOverrides.id)
        : await userFactory.create(userOverrides, User);

    if (!user) {
      throw new Error("User not found");
    }

    // Create an associated Portfolio record
    const portfolio = await portfolioFactory.create(
      { ...portfolioOverrides, userId: user.id },
      Portfolio
    );

    return { user, portfolio };
  },

  build(
    userOverrides?: Partial<User>,
    portfolioOverrides?: Partial<Portfolio>
  ): { user: Partial<User>; portfolio: Partial<Portfolio> } {
    // Build a User object in memory
    const user = userFactory.build(userOverrides);

    // Build an associated Portfolio object in memory
    const portfolio = portfolioFactory.build({
      ...portfolioOverrides,
      userId: user.id,
    });

    return { user, portfolio };
  },
}