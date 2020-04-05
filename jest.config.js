// const { defaults: tsjPreset } = require('ts-jest/presets');
// const { jsWithTs: tsjPreset } = require('ts-jest/presets');
// const { jsWithBabel: tsjPreset } = require('ts-jest/presets');

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
