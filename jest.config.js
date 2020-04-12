module.exports = {
  preset: 'ts-jest/presets/js-with-babel',
  transformIgnorePatterns: ['node_modules/(?!fp-ts)'],
  setupFiles: ['./test/index.ts'],
  globals: {
    _env: {},
    'ts-jest': {
      tsConfig: './tsconfig.spec.json'
    }
  }
}
