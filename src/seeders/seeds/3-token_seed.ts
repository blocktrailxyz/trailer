import Token from "models/token";
import seedable from "seeders/seedable";

const seedTokens = async() => {
  const cryptoTokens = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      chain: 'Bitcoin',
      imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
      contractAddress: null,
      decimals: 8,
      totalSupply: '19819137 BTC',
      maxSupply: '21000000 BTC',
      launchDate: 'January 2009',
      tokenRank: 1,
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      chain: 'Ethereum',
      imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
      contractAddress: null,
      decimals: 18,
      totalSupply: '120,524,819 ETH',
      maxSupply: null,
      launchDate: 'July 2015',
      tokenrank: 2,
    },
    {
      name: 'Tether',
      symbol: 'USDT',
      chain: 'Ethereum',
      imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
      contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
      decimals: 6,
      totalSupply: '139,399,246,307 USDT',
      maxSupply: null,
      launchDate: 'October 2014',
      tokenrank: 5,
    },
    {
      name: 'XRP',
      symbol: 'XRP',
      chain: 'XRP Ledger',
      imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png',
      contractAddress: null,
      decimals: 6,
      totalSupply: '99,989,535,142 XRP',
      maxSupply: '100,000,000,000 XRP',
      launchDate: '2012',
      tokenrank: 3,

    },
    {
      name: 'Solana',
      symbol: 'SOL',
      chain: 'Solana',
      imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
      contractAddress: null,
      decimals: 9,
      totalSupply: '511,616,946 SOL',
      maxSupply: null,
      launchDate: 'March 2020',
      tokenrank: 4,
    },
    {
      name: 'Binance Coin',
      symbol: 'BNB',
      chain: 'Binance Chain',
      imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
      contractAddress: null,
      decimals: 18,
      totalSupply: '168,137,036 BNB',
      maxSupply: '168,137,036 BNB',
      launchDate: 'July 2017',
      tokenrank: 6,

    },
    {
      name: 'USD Coin',
      symbol: 'USDC',
      chain: 'Ethereum',
      imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png',
      contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      decimals: 6,
      totalSupply: '53,000,000,000 USDC',
      maxSupply: null,
      launchDate: 'September 2018',
      tokenrank: 7,

    },
    {
      name: 'Cardano',
      symbol: 'ADA',
      chain: 'Cardano',
      imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png',
      contractAddress: null,
      decimals: 6,
      totalSupply: '45,000,000,000 ADA',
      maxSupply: '45,000,000,000 ADA',
      launchDate: 'September 2017',
      tokenrank: 8,

    },
    {
      name: 'Dogecoin',
      symbol: 'DOGE',
      chain: 'Dogecoin',
      imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png',
      contractAddress: null,
      decimals: 8,
      totalSupply: '132,670,764,300 DOGE',
      maxSupply: null,
      launchDate: 'December 2013',
      tokenrank: 9,

    },
    {
      name: 'Polkadot',
      symbol: 'DOT',
      chain: 'Polkadot',
      imageUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6636.png',
      contractAddress: null,
      decimals: 10,
      totalSupply: '1,103,303,471 DOT',
      maxSupply: null,
      launchDate: 'May 2020',
      tokenrank: 10,
    },
  ];

  await seedable( async() => {
    for (const cryptoToken of cryptoTokens) {
      const options = { ...cryptoToken,
        totalSupply: cryptoToken.totalSupply ?parseInt(cryptoToken.totalSupply.replace(/[^0-9]/g, '')) : null,
        maxSupply: cryptoToken.maxSupply ? parseInt(cryptoToken.maxSupply.replace(/[^0-9]/g, '')) : null,
      }
      const[token, existed ] = await Token.findOrBuild({ where: { symbol: cryptoToken.symbol }});
      token.set(options);
      token.save()
      console.log(`Token ${token.name} ${ existed ? 'already exists': 'created'}`);
    }
  });
}

export default seedTokens;