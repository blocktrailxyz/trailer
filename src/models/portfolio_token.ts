import { Model, DataTypes } from 'sequelize';
import sequelize from 'config/database';
import Portfolio from './portfolio';
import Token from './token';
import User from './user';

class PortfolioToken extends Model {
  declare id: string;
  declare userId: string;
  declare portfolioId: string;
  declare tokenId: string;
  declare amount: number;
  declare averageBuyPrice: number;
  declare totalInvested: number;
  declare currentPrice: number;
  declare totalValue: number;
  declare profitLoss: number;
  declare buyCount: number;
  declare sellCount: number;
  declare lastTradeDate: Date;
}

PortfolioToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: 'id',
      },
    },
    portfolioId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Portfolio,
        key: 'id',
      },
      primaryKey: true,
    },
    tokenId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Token,
        key: 'id',
      },
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false,
      defaultValue: 0,
    },
    averageBuyPrice: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false,
      defaultValue: 0.0,
    },
    totalInvested: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false,
      defaultValue: 0.0,
    },
    currentPrice: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false,
      defaultValue: 0.0,
    },
    totalValue: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false,
      defaultValue: 0.0,
    },
    profitLoss: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false,
      defaultValue: 0.0,
    },
    buyCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sellCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lastTradeDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'PortfolioToken',
    tableName: 'portfolio_tokens',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['portfolioId', 'tokenId'], unique: true },
      { fields: ['tokenId'] },
    ],
  }
);

Portfolio.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Portfolio, { foreignKey: 'userId' });

// Define relationships
User.hasMany(PortfolioToken, { foreignKey: 'userId' });
PortfolioToken.belongsTo(User, { foreignKey: 'userId' });

Portfolio.belongsToMany(Token, { through: PortfolioToken, foreignKey: 'portfolioId' });
Token.belongsToMany(Portfolio, { through: PortfolioToken, foreignKey: 'tokenId' });

export default PortfolioToken;
