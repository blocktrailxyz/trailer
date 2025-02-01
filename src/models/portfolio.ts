import { Model, DataTypes } from 'sequelize';
import sequelize from 'config/database';
import User from './user';

class Portfolio extends Model {
  public id!: string;
  public userId!: string;
  public name!: string;
  public main!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    },

    main: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },


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
