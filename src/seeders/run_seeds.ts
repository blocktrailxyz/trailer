import path from 'path';
import fs from 'fs/promises';
import 'config/database';

const seedsDirectory = path.join(__dirname, 'seeds');
const runSeeds = async () => {

  const files = await fs.readdir(seedsDirectory);
  let seedFiles: string[] = files.filter(file => file.endsWith('.ts') || file.endsWith('.js')); // Filter .ts or .js files
  seedFiles = seedFiles.sort(); // Sort seed files alphabetically

  for (const file of seedFiles) {
    await runSeed(file);
  }
};

const runSeed = async (file: string) => {
  try {
    const seedPath = path.join(seedsDirectory, file);
    console.log(`Executing seed file: ${file}`);
    const seedModule = await import(seedPath);
    if (typeof seedModule.default === 'function') {
      await seedModule.default(); // Execute the default export
      console.log(`Finished seeding file: ${file}`);
    } else {
      console.warn(`Seed file ${file} does not have a default export.`);
    }
  }
  catch (error) {
    console.error(`Error seeding file ${file}:`, error);
  }
}

runSeeds();
