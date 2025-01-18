import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path'

let rootEnvPath = path.resolve(__dirname, '../../.env');

if (process.env.NODE_ENV == "development") {
  dotenv.config({ path: rootEnvPath });
}
else if (process.env.NODE_ENV == "test") {
  // Check if .env.test exists
  const rootEnvTestPath = path.resolve(__dirname, '../../.env.test');

  rootEnvPath = fs.existsSync(rootEnvTestPath) ? rootEnvTestPath : rootEnvPath;
  // Load the appropriate environment file
  dotenv.config({ path: rootEnvPath });
}
