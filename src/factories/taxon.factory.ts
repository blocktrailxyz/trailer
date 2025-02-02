import Taxon from "models/taxon";
import { Factory } from "./factory";
import { faker } from "@faker-js/faker/.";
import Taxonomy from "models/taxonomy";
import { taxonomyFactory } from "./taxonomy.factory";

export const taxonFactory = new Factory<Partial<Taxon>>(() => {
  const name = faker.commerce.product();
  return  {
    name
  }
});

export const taxonWithTaxonomyFactory = {
  async create(taxonomyOverrides?: Partial<Taxonomy>, taxonOverrides?: Partial<Taxon>):
    Promise<{ taxon: Partial<Taxon>; taxonomy: Partial<Taxonomy> }> {
    const taxonomy = taxonomyOverrides?.id
                      ? await Taxonomy.findByPk(taxonomyOverrides.id)
                      : await taxonomyFactory.create(taxonomyOverrides, Taxonomy);

    if (!taxonomy) {
      throw new Error("Taxonomy not found");
    }
    const taxon = await taxonFactory.create({ ...taxonOverrides, taxonomyId: taxonomy.id }, Taxon);

    return{ taxon, taxonomy };
  }
}
