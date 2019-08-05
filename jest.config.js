// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of file extensions your modules use
  moduleFileExtensions: [
    'js',
    'json',
    'ts',
    'node'
  ],

  // A list of paths to directories that Jest should use to search for files in
  roots: [
    '<rootDir>/src'
  ],

  'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.(j|t)sx?$',

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest'
  }
}
