import { Env } from "libs/env";
import { Sequelize } from "sequelize";

const env = new Env(process.env);
const dbName = env.fetch('NODE_ENV', '') === "test" ? env.fetch('DB_TEST_NAME') : env.fetch('DB_NAME')

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: dbName,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: process.env.NODE_ENV === 'development', // Log SQL queries in development
});

export default sequelize;