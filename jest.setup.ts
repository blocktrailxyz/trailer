// Load environment variables
// import './src/libs/env';
import { Env } from './src/libs/env';
import { Transaction } from 'sequelize';
import sequelize from './src/config/database';

// Generate a unique schema name based on the test file
const schemaName = `test_${Math.random().toString(36).substring(2, 10)}`;

let transaction: Transaction;
const usedTransaction = Env.fetch('DB_CLEANER', 'transaction') == "transaction"

// Ensure the database is synced before all tests
beforeAll(async () => {
  await sequelize.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
  await sequelize.sync({ force: true, searchPath: schemaName }); // Sync models to the test schema

  // await sequelize.sync({ force: true });
});

// Start a new transaction before each test
beforeEach(async () => {
  // Set the search path for all subsequent queries
  await sequelize.query(`SET search_path TO "${schemaName}"`);

  if(usedTransaction)
    transaction = await sequelize.transaction();
});

// Clean up the database after each test
afterEach(async () => {
  // use transaction
  if(usedTransaction)
    return  await transaction.rollback();

  // physical db cleanup
  const models = Object.values(sequelize.models);
  for (const model of models) {
    try {
      await model.destroy({ where: {}, truncate: true, cascade: true });
    }
    catch(error) {
      console.log(`Error cleaning up model ${model.name}: ${error}`);
      return error
    }
  }
});

// Close the database connection after all tests
afterAll(async () => {
  await sequelize.query(`DROP SCHEMA IF EXISTS "${schemaName}" CASCADE`);
  await sequelize.close();
});