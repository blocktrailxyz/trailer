import { portfolioTokenUserFactory } from 'factories/portfolio_token.factory';
import PortfolioToken from 'models/portfolio_token';

describe('PortfolioToken Model', () => {
  it('should have attributes', async () => {
    const attributes = PortfolioToken.getAttributes();
    expect(attributes.id).toBeDefined();
    expect(attributes.userId).toBeDefined();
    expect(attributes.portfolioId).toBeDefined();
    expect(attributes.tokenId).toBeDefined();
  })
  it('should create a valid PortfolioToken', async () => {
    const { portfolioToken } = await portfolioTokenUserFactory.create();

    expect(portfolioToken).toHaveProperty('id');
    expect(portfolioToken).toHaveProperty('userId');
    expect(portfolioToken).toHaveProperty('portfolioId');
    expect(portfolioToken).toHaveProperty('tokenId');
  });
});
