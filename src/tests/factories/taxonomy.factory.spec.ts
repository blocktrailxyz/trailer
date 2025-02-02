import { taxonomyFactory } from "factories/taxonomy.factory";
import Taxonomy from "models/taxonomy";

describe('taxonomyFactory', () => {
  it('.build', () => {
    const taxonomy = taxonomyFactory.build({}) as Taxonomy;
    expect(taxonomy.name).toBeDefined();
  });

  it('.create', async () => {
    const taxonomy = await taxonomyFactory.create({name: "Solana Chain"}, Taxonomy) as Taxonomy;
    expect(taxonomy.id).toBeDefined();
    expect(taxonomy.name).toEqual("Solana Chain");
    expect(taxonomy.slug).toEqual("solana-chain");
    expect(taxonomy.createdAt).toBeDefined();
    expect(taxonomy.updatedAt).toBeDefined();
  });
})