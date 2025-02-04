import { faker } from "@faker-js/faker/.";
import { taxonomyFactory } from "factories/taxonomy.factory";
import Taxon from "models/taxon";
import Taxonomy from "models/taxonomy";

describe("Taxon Model", () => {
  describe("setSlug", () => {
    it("should set slug for a taxon", async () => {
      const taxonomy = await taxonomyFactory.create({}, Taxonomy);
      const taxon = Taxon.build({ name: "Test Taxon", taxonomyId: taxonomy.id });
      taxon.setSlug();

      expect(taxon.slug).toBe("test-taxon");
    });

    it("should not override existing slug", async () => {

      const taxonomy = await taxonomyFactory.create({}, Taxonomy);
      const taxon = Taxon.build({ name: "Test Taxon", slug: "existing-slug", taxonomyId: taxonomy.id });
      taxon.setSlug();

      expect(taxon.slug).toBe("existing-slug");
    });
  });
  describe("Taxon Model - setTreeAttributes", () => {

    it("should set left, right, and depth for a root taxon", async () => {
      const taxonomy = await taxonomyFactory.create({}, Taxonomy);
      const taxon = Taxon.build({ name: "Root Taxon", taxonomyId: taxonomy.id });
      await taxon.setTreeAttributes();
      await taxon.save();

      expect(taxon.left).toBe(1);
      expect(taxon.right).toBe(2);
      expect(taxon.depth).toBe(0);
    });

    it("should set left, right, and depth for a child taxon", async () => {
      await Taxon.destroy({ where: {} });

      const taxonomy = await taxonomyFactory.create({}, Taxonomy);
      const rootTaxon = await Taxon.create({ name: "Root", taxonomyId: taxonomy.id });

      const rootLeft = rootTaxon.left;
      const rootRight = rootTaxon.right

      // console.log("rootTaxon", `left: ${rootTaxon.left}, right: ${rootTaxon.right}, depth: ${rootTaxon.depth}`);
      const childTaxon = Taxon.build({ name: "Child", taxonomyId: taxonomy.id, parentId: rootTaxon.id });

      await childTaxon.save();
      // console.log("childTaxon", `left: ${childTaxon.left}, right: ${childTaxon.right}, depth: ${childTaxon.depth}`);

      await rootTaxon.reload();
      // console.log("rootTaxon", `left: ${rootTaxon.left}, right: ${rootTaxon.right}, depth: ${rootTaxon.depth}`);

      expect(childTaxon.left).toEqual(rootRight);
      expect(childTaxon.right).toEqual(rootRight + 1);
      expect(rootTaxon.left).toEqual(rootLeft);
      expect(rootTaxon.right).toEqual(rootRight + 2);
    });

    it("should throw an error if parent taxon does not exist", async () => {
      const badParentId = faker.string.uuid();
      const taxonomy = await Taxonomy.create({ name: "Test Taxonomy" });
      const invalidTaxon = Taxon.build({ name: "Invalid", taxonomyId: taxonomy.id, parentId: badParentId });

      await expect(invalidTaxon.setTreeAttributes()).rejects.toThrow();
    });
  });
});
