import { faker } from "@faker-js/faker/locale/af_ZA";
import Portfolio from "models/portfolio";
import PortfolioToken from "models/portfolio_token";
import Token from "models/token";
import User from "models/user";
import seedable from "seeders/seedable";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]; // Create a copy to avoid mutating the original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

async function generatePortfolio(user: User, tokens: Token[]) {
  const [portfolio] = await Portfolio.findOrBuild({where: {userId: user.id}});
  portfolio.name = faker.company.name();
  await portfolio.save();

  const shuffledTokens = shuffleArray(tokens);

  for(let i=0; i<5; i++) {
    const token = shuffledTokens[i];
    await PortfolioToken.findOrCreate({where: {portfolioId: portfolio.id, tokenId: token.id, userId: user.id}});
  }
}

const portfilioSeeds = async() => {
  await seedable( async() => {
    const users = await User.findAll({where: {}})
    const shuffleUsers = shuffleArray(users);

    const tokens = await Token.findAll({where: {}})
    const max = shuffleUsers.length > 100 ? 100 : shuffleUsers.length;

    for(let i=0; i<max; i++) {
      await generatePortfolio(shuffleUsers[i], tokens);
    }
  });
}

export default portfilioSeeds;