/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: [
    '.history',
    '__tests__/js.macro.ts',
    '__tests__/fixtures/',
  ],
};