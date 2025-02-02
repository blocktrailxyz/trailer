import { DataTypes, Model } from "sequelize";
import sequelize from "config/database";
import {slugify} from "helpers/app_helper";

export default class Taxonomy extends Model {
  declare id: string;
  declare name: string;
  declare slug: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Taxonomy.init(
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
  },
  {
    sequelize,
    modelName: "Taxonomy",
    tableName: "taxonomies",
    timestamps: true,
    indexes: [
      { fields: ["slug"], unique: true },
    ],
    hooks: {
      beforeValidate: (taxonomy) => {
        if(!taxonomy.slug)
          taxonomy.slug = slugify(taxonomy.name);
      },
      beforeUpdate: (taxonomy) => {
        taxonomy.slug = slugify(taxonomy.name);
      }
    }
  }
);