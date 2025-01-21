// Load environment variables
import './src/libs/env';
import dbClient from './src/config/database';

// Ensure the database is synced before all tests
beforeAll(async () => {
  await dbClient.sync({ force: true });
});

// Clean up the database after each test
afterEach(async () => {
  const models = Object.values(dbClient.models);
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
  await dbClient.close();
});