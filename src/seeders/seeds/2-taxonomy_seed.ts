import Taxon from "models/taxon";
import Taxonomy from "models/taxonomy";
import seedable from "seeders/seedable";

const seedTaxons = async() => {
  const cryptoCategories = {
    'DeFi': ['Yield Farming', 'Liquidity Pools', 'Lending & Borrowing', 'Decentralized Insurance'],
    'Layer 1 Blockchain': ['Smart Contracts', 'Sharding', 'Consensus Mechanisms'],
    'Layer 2 Scaling': ['Rollups', 'Sidechains', 'State Channels'],
    'Stablecoins': ['Algorithmic Stablecoins', 'Fiat-backed', 'Crypto-backed'],
    'NFT & Metaverse': ['Gaming NFTs', 'Virtual Real Estate', 'Digital Art'],
    'Gaming': ['Play-to-Earn (P2E)', 'GameFi', 'In-game Assets'],
    'Web3': ['Decentralized Identity', 'SocialFi', 'Decentralized Storage'],
    'Privacy Coins': ['Ring Signatures', 'Zero-Knowledge Proofs', 'Stealth Addresses'],
    'DEX (Decentralized Exchange)': ['Automated Market Makers (AMM)', 'Order Book DEX', 'Cross-chain Swaps'],
    'Meme Coins': ['Community-driven', 'Dog-themed', 'High Volatility'],
    'AI & Machine Learning': ['AI Trading Bots', 'Predictive Analysis', 'AI-powered Smart Contracts'],
    'Yield Farming': ['Staking Rewards', 'Farming Pools', 'Auto-compounding'],
    'Staking': ['Proof-of-Stake (PoS)', 'Delegated Staking', 'Liquid Staking'],
    'Governance Tokens': ['DAO Governance', 'On-chain Voting', 'Revenue Sharing'],
    'Oracles': ['Decentralized Data Feeds', 'Price Feeds', 'Off-chain Data Integration'],
    'Derivatives': ['Futures', 'Perpetual Swaps', 'Options Trading'],
    'Interoperability': ['Cross-chain Bridges', 'Layer 0 Protocols', 'Multi-chain Wallets'],
    'Tokenized Real-World Assets': ['Real Estate', 'Stocks', 'Commodities'],
    'Security Tokens': ['Regulated Assets', 'Compliance Frameworks', 'Tokenized Equities'],
    'Lending & Borrowing': ['Collateralized Loans', 'Flash Loans', 'P2P Lending'],
    'Decentralized Insurance': ['Smart Contract Cover', 'Protocol Insurance', 'Risk Pools'],
    'Decentralized Identity': ['Self-sovereign Identity', 'KYC Solutions', 'Digital Passports'],
    'SocialFi': ['Social Tokens', 'DAO Communities', 'Creator Economy'],
    'Decentralized Storage': ['Filecoin', 'IPFS', 'Arweave'],
    'Cross-chain Swaps': ['Atomic Swaps', 'Wrapped Tokens', 'Chainlink'],
    'Automated Market Makers (AMM)': ['Uniswap', 'SushiSwap', 'Balancer'],
    'Order Book DEX': ['Matcha', '1inch', 'DEX Aggregators'],
  };

  await seedable( async() => {
    const taxonomyName = "crypto"
    const [taxonomy, created] = await Taxonomy.findOrBuild({ where: { name: taxonomyName } });
    console.log(`Created ${taxonomyName} ${created ? 'successfully' : 'already exists'}`);
    await taxonomy.save();

    for (const [category, subcategories] of Object.entries(cryptoCategories)) {
      const [parent, created] = await Taxon.findOrBuild({ where: { name: category, taxonomyId: taxonomy.id }});
      parent.setTreeAttributes();
      parent.setSlug();

      await parent.save();
      console.log(`Created ${category} ${created ? 'successfully' : 'already exists'}`);

      for (const subcategory of subcategories) {
        const [created] = await Taxon.findOrCreate({ where: { name: subcategory, taxonomyId: taxonomy.id, parentId: parent.id } });
        console.log(`Created ${subcategory} ${created ? 'successfully' : 'already exists'}`);
      }
    }
  });
}

export default seedTaxons