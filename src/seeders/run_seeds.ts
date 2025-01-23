import path from 'path';
import fs from 'fs/promises';
import sequelize from 'config/database';

const seedsDirectory = path.join(__dirname, 'seeds');

const runSeeds = async () => {
  try {
    console.log('Connecting to the database...');
    await sequelize.authenticate();
    await sequelize.sync(); // Ensure tables are up to date

    console.log(`Running seed files from ${seedsDirectory}...`);
    const files = await fs.readdir(seedsDirectory);
    const seedFiles = files.filter(file => file.endsWith('.ts') || file.endsWith('.js')); // Filter .ts or .js files

    for (const file of seedFiles) {
      const seedPath = path.join(seedsDirectory, file);
      console.log(`Executing seed file: ${file}`);
      const seedModule = await import(seedPath);
      if (typeof seedModule.default === 'function') {
        await seedModule.default(); // Execute the default export
      } else {
        console.warn(`Seed file ${file} does not have a default export.`);
      }
    }

    console.log('All seeds have been executed!');
  } catch (error) {
    console.error('Error running seeds:', error);
  } finally {
    await sequelize.close();
  }
};

runSeeds();
