import type { Config } from 'jest'

const jestConfig: Config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  testMatch: ['**/__tests__/**/*.{ts,tsx}', '**/*.(test|spec).{ts,tsx}'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(antd|@ant-design|rc-.+|@babel/runtime)/)'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/stories/**',
    '!**/*.stories.{ts,tsx}',
    '!**/.storybook/**',
    '!**/dist/**',
    '!**/build/**',
    '!**/index.{ts,tsx}',
    '!**/coverage/**',
    '!**/jest.config.{ts,js}',
    '!**/webpack.config.{ts,js}',
  ],
  setupFilesAfterEnv: ['<rootDir>/../../src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.svg$': '<rootDir>/../../src/__mocks__/svgMock.tsx',
    '^antd/es/(.*)$': 'antd/lib/$1',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/dist/',
    '/build/',
    '/stories/',
    '/.storybook/',
    '\\.stories\\.(ts|tsx|js|jsx)$',
  ],
}

export default jestConfig
