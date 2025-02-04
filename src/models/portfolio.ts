import { Model, DataTypes } from 'sequelize';
import sequelize from 'config/database';
import User from './user';

class Portfolio extends Model {
  declare id: string;
  declare userId: string;
  declare name: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Portfolio.init(
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Portfolio',
    tableName: 'portfolios',
    timestamps: true,
    indexes: [
      { fields: ['userId'] }, // Index for fast lookups
      { fields: ['name'] }, // Index for fast lookups
    ],
  }
);

export default Portfolio;
