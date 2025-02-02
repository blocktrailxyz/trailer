// models/taxon_token.ts
import sequelize from "config/database";
import { DataTypes, Model } from "sequelize";

class TaxonToken extends Model {
  declare id: string;
  declare tokenId: string;
  declare taxonId: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

TaxonToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    tokenId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "tokens", key: "id" },
      onDelete: "CASCADE",
    },
    taxonId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: "taxons", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "TaxonToken",
    tableName: "taxon_tokens",
    timestamps: true,
    indexes: [
      { fields: ["taxonId", "tokenId"], unique: true },
      { fields: ["tokenId"] },
    ]
  }
);

export default TaxonToken;