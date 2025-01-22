/** @type {import('ts-jest').JestConfigWithTsJest} **/
// module.exports = {
//   testEnvironment: "node",
//   transform: {
//     "^.+.tsx?$": ["ts-jest",{}],
//   },
// };

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Match test files
  moduleFileExtensions: ['ts', 'js'], // Recognize TS and JS files
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], //
  maxWorkers: 1, // run test sequentially
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.json', // Path to your TypeScript config file
      diagnostics: true,        // Enable diagnostics to catch TypeScript issues
    }],
  },
  
  // globals: {
  //   'ts-jest': {
  //     tsconfig: 'tsconfig.json', // Use your existing TypeScript config
  //   },
  // },
};


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
