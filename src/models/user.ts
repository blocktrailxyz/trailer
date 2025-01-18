import { Model, DataTypes } from 'sequelize';
import sequelize from 'config/database';

class User extends Model {
  public id!: number;
  public displayName!: string;
  public emojicon!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emojicon: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
