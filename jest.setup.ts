// Load environment variables
import './src/libs/env';
import sequelize from './src/config/database';

// Ensure the database is synced before all tests
beforeAll(async () => {
  await sequelize.sync({ force: true });
});

// Clean up the database after each test
afterEach(async () => {
  const models = Object.values(sequelize.models);
  for (const model of models) {
    try {
      await model.destroy({ where: {}, truncate: true, cascade: true });
    }
    catch(error) {
      console.log(`Error cleaning up model ${model.name}: ${error}`);
    }
  }
});

// Close the database connection after all tests
afterAll(async () => {
  await sequelize.close();
});