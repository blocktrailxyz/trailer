// models/taxon.ts
import { DataTypes, Model, Op } from "sequelize";
import sequelize from "config/database";
import Taxonomy from "models/taxonomy";
import Token from "models/token";
import TaxonToken from "models/taxon_token";
import { slugify } from "helpers/app_helper";

class Taxon extends Model {
  declare id: string;
  declare name: string;
  declare slug: string;
  declare taxonomyId: string;
  declare parentId?: string;
  declare left: number;
  declare right: number;
  declare depth: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  public setSlug() {
    if(!this.slug)
      this.slug = slugify(this.name);
  }
  async setTreeAttributes() {
    // docs/algorithms/taxon-nested_set.md

    if (!this.parentId) {
      // Root Node - Get max right value
      const maxRight = (await Taxon.max("right") as number) || 0;
      this.left = maxRight + 1;
      this.right = maxRight + 2;
      this.depth = 0;
    }
    else {
      // Child Node - Adjust tree structure
      const parent = await Taxon.findByPk(this.parentId);
      if (!parent) {
        throw new Error("Parent taxon not found");
      }

      // Update existing right values for nested set
      await Taxon.increment(
        { left: 2 },
        { where: { left: { [Op.gt]: parent.right } } }
      );
      await Taxon.increment(
        { right: 2 },
        { where: { right: { [Op.gte]: parent.right } } }
      );

      this.left = parent.right;
      this.right = parent.right + 1;
      this.depth = parent.depth + 1;
    }
  }
}

Taxon.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    taxonomyId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "taxons", key: "id" },
      onDelete: "CASCADE",
    },
    left: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    right: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    depth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Taxon",
    tableName: "taxons",
    timestamps: true,
    indexes: [
      { fields: ["slug"] },
      { fields: ["taxonomyId", "parentId"] },
      { fields: ["parentId"] },
    ],
    hooks: {
      beforeValidate: async (obj) => {
        obj.setSlug();
        await obj.setTreeAttributes();
      },
      beforeUpdate: (obj) => {
        obj.setSlug();
      }
    }
  }
);

Taxonomy.hasMany(Taxon, { foreignKey: "taxonomyId" });
Taxon.belongsTo(Taxonomy, { foreignKey: "taxonomyId" });

Taxon.belongsTo(Taxon, { as: "parent", foreignKey: "parentId" });
Taxon.hasMany(Taxon, { as: "children", foreignKey: "parentId" });

Taxon.belongsToMany(Token, { through: TaxonToken });
Token.belongsToMany(Taxon, { through: TaxonToken });

export default Taxon;
