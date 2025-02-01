import { Model, DataTypes } from 'sequelize';
import sequelize from 'config/database';

class User extends Model {
  public id!: string;
  public displayName!: string;
  public emojicon!: string;

  public portfolioCount!: number;
  public tokensCount!: number;
  public chainsCount!: number;
  public tradesCount!: number;
  public totalInvested!: number;
  public profitLoss!: number;
  public preferredChains!: object;

  // public watchlistTokens!: object;
  // public tradingHistory!: object;

  public isProUser!: boolean;
  public TfaEnabled!: boolean;
  public preferredCurrency!: string;
  public notificationPreferences!: object;
  public darkModeEnabled!: boolean;

  public createdAt!: Date;
  public updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emojicon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    portfolioCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    tokensCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    chainsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    tradesCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    totalInvested: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false,
      defaultValue: 0.0,
    },
    profitLoss: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false,
      defaultValue: 0.0,
    },
    preferredChains: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: [],
    },
    isProUser: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    TfaEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    preferredCurrency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'USD',
    },
    notificationPreferences: {
      type: DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
    darkModeEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    indexes: [
      { fields: ['displayName'] },
      { fields: ['portfolioCount'] },
      { fields: ['tokensCount'] },
      { fields: ['chainsCount'] },
    ],
  }
);

export default User;
