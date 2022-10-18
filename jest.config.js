const nextJest = require('next/jest')

const nextJestConfig = nextJest({
  dir: './'
})

/**
 * @type { import('jest').Config }
 */
const jestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@components': '<rootDir>/components/index.ts',
    '^@pages/(.*)$': '<rootDir>/pages/$1'
  },
  testEnvironment: 'jest-environment-jsdom'
}

module.exports = nextJestConfig(jestConfig)
