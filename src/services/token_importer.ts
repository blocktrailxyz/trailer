/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import Token from "models/token";

export default class TokenImporter {
  public static async fromUrl(url: string) {
    try {
      const tokens = await this.fetchData(url);
      await this.importTokens(tokens);
    } catch {
      throw new Error('Failed to fetch data from URL');
    }
  }

  public static async fetchData(url: string): Promise<any> {
    const response = await axios.get(url);
    const tokens = response.data;
    return tokens
  }

  public static async importTokens(tokens: any) {
    const formattedTokens = tokens.map((token: any) => {
      return {
        symbol: token.symbol,
        name: token.name,
        description: token.description || '',
        warning: token.warning || '',
        imageUrl: token.image || '',
        chain: token.chain || '',
        contractAddress: token.contractAddress || '',
        decimals: token.decimals || 0,
        totalSupply: token.totalSupply || 0,
        maxSupply: token.maxSupply || 0,
        isVerified: token.isVerified ?? true,
      };
    });
    // console.log('formattedTokens', formattedTokens);
    await Token.bulkCreate(formattedTokens);
  }
}