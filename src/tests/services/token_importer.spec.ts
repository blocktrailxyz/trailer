import TokenImporter from 'services/token_importer';
import Token from 'models/token';

describe('TokenImporter Service', () => {
  const sampleTokens = [
    {
      id: "bitcoin",
      symbol: "btc",
      name: "Bitcoin",
      image: "https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
      current_price: 104187,
      market_cap: 2064910139914,
      market_cap_rank: 1,
      fully_diluted_valuation: 2064919934393,
      total_volume: 37522803518,
      high_24h: 106191,
      low_24h: 103930,
      price_change_24h: -1111.4411762823001,
      price_change_percentage_24h: -1.05552,
      market_cap_change_24h: -20224531285.83667,
      market_cap_change_percentage_24h: -0.96994,
      circulating_supply: 19817446,
      total_supply: 19817540,
      max_supply: 21000000,
      ath: 108786,
      ath_change_percentage: -4.47401,
      ath_date: "2025-01-20T09:11:54.494Z",
      atl: 67.81,
      atl_change_percentage: 153151.70622,
      atl_date: "2013-07-06T00:00:00.000Z",
      roi: null,
      last_updated: "2025-01-31T09:30:35.317Z",
    },
    {
      id: "ethereum",
      symbol: "eth",
      name: "Ethereum",
      image: "https://coin-images.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
      current_price: 3247.62,
      market_cap: 391365934095,
      market_cap_rank: 2,
      fully_diluted_valuation: 391365934095,
      total_volume: 18867451329,
      high_24h: 3280.73,
      low_24h: 3209.92,
      price_change_24h: 37.7,
      price_change_percentage_24h: 1.17453,
      market_cap_change_24h: 4589940354,
      market_cap_change_percentage_24h: 1.18672,
      circulating_supply: 120518600.1681165,
      total_supply: 120518600.1681165,
      max_supply: null,
      ath: 4878.26,
      ath_change_percentage: -33.67576,
      ath_date: "2021-11-10T14:24:19.604Z",
      atl: 0.432979,
      atl_change_percentage: 747158.02393,
      atl_date: "2015-10-20T00:00:00.000Z",
      roi: { times: 40.6874933935528, currency: "btc", percentage: 4068.74933935528 },
      last_updated: "2025-01-31T09:30:38.350Z",
    },
    {
      id: "ripple",
      symbol: "xrp",
      name: "XRP",
      image: "https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
      current_price: 3.08,
      market_cap: 177455629607,
      market_cap_rank: 3,
      fully_diluted_valuation: 307487469559,
      total_volume: 4272480138,
      high_24h: 3.15,
      low_24h: 3.06,
      price_change_24h: -0.0331897839966806,
      price_change_percentage_24h: -1.06779,
      market_cap_change_24h: -1569968148.313324,
      market_cap_change_percentage_24h: -0.87695,
      circulating_supply: 57703732191,
      total_supply: 99986541057,
      max_supply: 100000000000,
      ath: 3.4,
      ath_change_percentage: -9.8054,
      ath_date: "2018-01-07T00:00:00.000Z",
      atl: 0.00268621,
      atl_change_percentage: 114009.55177,
      atl_date: "2014-05-22T00:00:00.000Z",
      roi: null,
      last_updated: "2025-01-31T09:30:35.388Z",
    },
  ];

  const mockUrl = "https://example.com/tokens.json";

  beforeEach(async () => {
    jest.clearAllMocks();
    await Token.destroy({ where: {} }); // Clear DB before each test
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original implementations after each test
  });

  it("should import tokens from JSON", async () => {
    await TokenImporter.importTokens(sampleTokens);

    const count = await Token.count();
    expect(count).toEqual(3); // Ensuring the correct number of tokens are stored

    const tokens = await Token.findAll();
    expect(tokens.length).toEqual(3);
  });

  it("should fetch and import tokens from a URL", async () => {
    jest.spyOn(TokenImporter, "fetchData").mockResolvedValue(sampleTokens);

    await TokenImporter.fromUrl(mockUrl);

    const tokens = await Token.findAll();
    expect(tokens.length).toEqual(3);
  });

  it("should throw an error when fetching from a URL fails", async () => {
    jest.spyOn(TokenImporter, "fetchData").mockRejectedValue(new Error("Failed to fetch data from URL"));

    await expect(TokenImporter.fromUrl(mockUrl)).rejects.toThrow("Failed to fetch data from URL");
  });
});
