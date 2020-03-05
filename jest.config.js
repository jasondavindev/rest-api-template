const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')
const merge = require('merge')
const tsPreset = require('ts-jest/jest-preset')

module.exports = merge.recursive(tsPreset, {
  clearMocks: true,
  coverageDirectory: '__tests__/coverage',
  coverageReporters: ['json', 'lcov'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),

  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*.spec.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
})
