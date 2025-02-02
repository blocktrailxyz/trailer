import Taxon from "models/taxon";
import { taxonWithTaxonomyFactory } from "./taxon.factory";
import Token from "models/token";
import { tokenFactory } from "./token.factory";
import TaxonToken from "models/taxon_token";

export const taxonTokenFactory =  {
  async create(taxonOverrides?: Partial<Taxon>, tokenOverrides?: Partial<Token>):
    Promise<{ taxon: Partial<Taxon>; token: Partial<Token>; taxonToken: Partial<TaxonToken>;}> {
    const { taxon } = taxonOverrides?.id
                      ? { taxon: await Taxon.findByPk(taxonOverrides.id) }
                      : await taxonWithTaxonomyFactory.create({}, taxonOverrides);

    if (!taxon) {
      throw new Error("Taxon not found");
    }

    const token = tokenOverrides?.id
                      ? await Token.findByPk(tokenOverrides.id)
                      : await tokenFactory.create(tokenOverrides, Token);

    if(!token) {
      throw new Error("Token not found");
    }

    const taxonToken = await TaxonToken.create({taxonId: taxon.id, tokenId: token.id});
    return { taxon, token, taxonToken };
  }
}