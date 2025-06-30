// @ts-check
import { createDefaultPreset } from 'ts-jest'

/** @type {import("jest").Config} **/
const config = {
  ...createDefaultPreset({
    tsconfig: 'tsconfig.test.json'
  }),
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.js']
}

export default config
