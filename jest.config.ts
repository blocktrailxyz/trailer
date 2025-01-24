/** @type {import('ts-jest').JestConfigWithTsJest} **/
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Match test files
  moduleFileExtensions: ['ts', 'js'], // Recognize TS and JS files
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], //
  maxWorkers: 1, // run test sequentially
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Remove ".js" extensions in imports
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json', // Path to your TypeScript config file
      diagnostics: true,        // Enable diagnostics to catch TypeScript issues
    }],
  },
  transformIgnorePatterns: [], // Fix the sui sdk
};

export default config;