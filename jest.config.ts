import { InitialOptionsTsJest } from 'ts-jest';

const config: InitialOptionsTsJest = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/src/**/*.test.ts'],
};

export default config;
