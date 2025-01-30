import Token from "models/token";
import { Factory } from "./factory";
import { faker } from "@faker-js/faker/.";

export const tokenFactory = new Factory<Partial<Token>>(() => ({
  symbol: faker.finance.currencyCode(),
  name: faker.finance.currencyName(),
  description: faker.lorem.sentence(),
  imageUrl: faker.image.url(),
  chain: 'ethereum',
  contractAddress: faker.finance.ethereumAddress(),
  decimals: 18,
  createdAt: new Date(),
  updatedAt: new Date(),
}));