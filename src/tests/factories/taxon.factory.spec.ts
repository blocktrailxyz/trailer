// tests/factories/taxon.factory.spec.ts

import { taxonWithTaxonomyFactory } from "factories/taxon.factory";
import Taxonomy from "models/taxonomy";
import Taxon from "models/taxon";
import { taxonomyFactory } from "factories/taxonomy.factory";

describe("Taxon Factory", () => {
  it("should create a Taxon with a Taxonomy", async () => {
    const { taxon, taxonomy } = await taxonWithTaxonomyFactory.create();

    expect(taxon).toBeDefined();
    expect(taxon).toBeInstanceOf(Taxon);
    expect(taxon.taxonomyId).toBe(taxonomy.id);
    expect(taxonomy).toBeDefined();
    expect(taxonomy).toBeInstanceOf(Taxonomy);
  });

  it("should create a Taxon with a specific Taxonomy override", async () => {
    const taxonomy = await taxonomyFactory.create({ name: "Custom Taxonomy" }, Taxonomy);
    const { taxon } = await taxonWithTaxonomyFactory.create({ id: taxonomy.id });

    expect(taxon.taxonomyId).toBe(taxonomy.id);
  });

  it("should throw an error if the specified Taxonomy does not exist", async () => {
    await expect(taxonWithTaxonomyFactory.create({ id: "non-existing-id" }))
      .rejects.toThrow();
  });

  it("should create a Taxon with overrides", async () => {
    const { taxon, taxonomy } = await taxonWithTaxonomyFactory.create({}, { name: "Custom Taxon" });

    expect(taxon.name).toBe("Custom Taxon");
    expect(taxon).toBeDefined();
    expect(taxon).toBeInstanceOf(Taxon);
    expect(taxon.taxonomyId).toBe(taxonomy.id);
    expect(taxonomy).toBeDefined();
    expect(taxonomy).toBeInstanceOf(Taxonomy);
  });
});