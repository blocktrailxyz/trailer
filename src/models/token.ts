import { Model, DataTypes } from 'sequelize';
import sequelize from 'config/database';

class Token extends Model {
  public id!: string;
  public symbol!: string;
  public name!: string;
  public description!: string;
  public warning!: string;
  public imageUrl!: string;
  public chain!: string;
  public contractAddress!: string;
  public decimals!: number;
  public totalSupply!: number;
  public maxSupply!: number;
  public isVerified!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Token.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    symbol: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tokenRank: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    warning: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    chain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contractAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    decimals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 18,
    },
    totalSupply: DataTypes.BIGINT,
    maxSupply: DataTypes.BIGINT,
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'Token',
    tableName: 'tokens',
    timestamps: true,
    indexes: [
      { fields: ['symbol'] },
      { fields: ['name'] },
      { fields: ['contractAddress'] },
      { fields: ['tokenRank'] },
    ],
  }
);

export default Token;
