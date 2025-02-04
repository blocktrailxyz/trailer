import Taxonomy from "models/taxonomy";
import { slugify } from "helpers/app_helper";

describe("Taxonomy Model", () => {
  it("should create a Taxonomy with a slug", async () => {
    const name = "Crypto Market";
    const slug = slugify(name);
    const taxonomy = await Taxonomy.create({ name });
    expect(taxonomy.id).toBeDefined();
    expect(taxonomy.name).toEqual(name);
    expect(taxonomy.slug).toEqual(slug);
  });

  it("should not allow null name", async () => {
    await expect(
      Taxonomy.create({ name: null })
    ).rejects.toThrow();
  });

  it("should update a Taxonomy and regenerate the slug", async () => {
    const taxonomy = await Taxonomy.create({ name: "Old Market" });
    await taxonomy.update({ name: "New Market" });
    expect(taxonomy.slug).toEqual(slugify("New Market"));
  });

  it("should not allow duplicate slugs", async () => {
    await Taxonomy.create({ name: "Unique Category" });
    await expect(
      Taxonomy.create({ name: "Unique Category" })
    ).rejects.toThrow();
  })
});
