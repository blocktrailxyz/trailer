/** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
//   testEnvironment: "node",
//   transform: {
//     "^.+.tsx?$": ["ts-jest",{}],
//   },
// };
import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  // preset: 'ts-jest/presets/default-esm',
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
  transformIgnorePatterns: [
    // Ignore all node_modules except @mysten/sui
    // 'node_modules/(?!(?:@mysten/sui)/)',
  ],
};

export default config;

// module.exports = {
//   preset: 'ts-jest', // Preset for TypeScript with Jest
//   testEnvironment: 'node', // Use Node.js environment
//   transform: {
//     '^.+\\.tsx?$': ['ts-jest', {
//       tsconfig: 'tsconfig.json', // Path to your TypeScript config file
//       diagnostics: true,        // Enable diagnostics to catch TypeScript issues
//     }],
//   },
//   moduleNameMapper: {
//     '^config/(.*)$': '<rootDir>/src/config/$1',
//     '^models/(.*)$': '<rootDir>/src/models/$1',
//   },
// };
