import { Env } from "libs/env";
import { Sequelize } from "sequelize";


const dbName = Env.isTest() ? Env.fetch('DB_TEST_NAME') : Env.fetch('DB_NAME')
// const poolSize = parseInt(Env.fetch('DB_POOL_SIZE', '5'))

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: dbName,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  logging: Env.isDevelopment(), // Log SQL queries in development
});

export default sequelize;