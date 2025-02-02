// tests/factories/taxon_token.factory.spec.ts
import { taxonTokenFactory } from "factories/taxon_token.factory";
import Taxon from "models/taxon";
import Token from "models/token";
import TaxonToken from "models/taxon_token";
import { taxonFactory } from "factories/taxon.factory";
import { tokenFactory } from "factories/token.factory";
import { taxonomyFactory } from "factories/taxonomy.factory";
import Taxonomy from "models/taxonomy";

describe("TaxonToken Factory", () => {
  it("should create a TaxonToken with a Taxon and Token", async () => {
    const { taxon, token, taxonToken } = await taxonTokenFactory.create({}, {});

    expect(taxon).toBeDefined();
    expect(taxon).toBeInstanceOf(Taxon);
    expect(token).toBeDefined();
    expect(token).toBeInstanceOf(Token);
    expect(taxonToken).toBeDefined();
    expect(taxonToken).toBeInstanceOf(TaxonToken);
  });

  it("should create a TaxonToken with specific Taxon and Token overrides", async () => {
    const taxonomy = await taxonomyFactory.create({}, Taxonomy);
    const taxon = await taxonFactory.create({ name: "Custom Taxon", taxonomyId: taxonomy.id }, Taxon);
    const token = await tokenFactory.create({ name: "Custom Token", symbol: "CTK" }, Token);
    const { taxonToken } = await taxonTokenFactory.create({ id: taxon.id }, { id: token.id });

    expect(taxonToken).toBeDefined();
    expect(taxonToken.taxonId).toEqual(taxon.id);
    expect(taxonToken.tokenId).toEqual(token.id);
  });

  it("should throw an error if the specified Taxon does not exist", async () => {
    await expect(taxonTokenFactory.create({ id: "non-existing-id" }))
      .rejects.toThrow();
  });

  it("should throw an error if the specified Token does not exist", async () => {
    await expect(taxonTokenFactory.create({}, { id: "non-existing-id" }))
      .rejects.toThrow();
  });
});
