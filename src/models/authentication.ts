import { DataTypes, Model } from 'sequelize';
import sequelize from 'config/database';
import User from 'models/user';

export enum OauthProvider {
  Google = 'google',
  GitHub = 'github',
  Telegram = 'telegram'
}

export enum BlockchainProvider {
  Sui = 'sui',
  Sol = 'sol',
  Base = 'base',
}

export const Provider = {
  ...OauthProvider,
  ...BlockchainProvider,
}  as const;

export type Provider = typeof Provider[keyof typeof Provider];

class Authentication extends Model {
  declare id: string;
  declare userId: string;
  declare provider: string;
  declare providerId: string;
}

Authentication.init(
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
    provider: {
      type: DataTypes.ENUM(...Object.values(Provider)),
      allowNull: false,
    },
    providerId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'authentications',
    timestamps: true,
  }
);

Authentication.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Authentication, { foreignKey: 'userId' });

export default Authentication;
