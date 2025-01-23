import { DataTypes, Model } from 'sequelize';
import sequelize from 'config/database';
import User from 'models/user';

export enum OauthProvider {
  Google = 'google',
  GitHub = 'github',
  Telegram = 'telegram',
}

export enum BlockchainProvider {
  Sui = 'sui',
  Sol = 'sol',
  Base = 'base',
}

// Combine the enums into a single object
export const AuthProvider = {
  ...OauthProvider,
  ...BlockchainProvider,
} as const;


class Authentication extends Model {
  public id!: string;
  public userId!: string;
  public provider!: string;
  public providerId!: string;
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
      type: DataTypes.ENUM(...Object.values(AuthProvider)),
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
