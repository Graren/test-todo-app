const config = {
  verbose: true,
  testPathIgnorePatterns: ["/node_modules/", "/out/", "/.webpack/"],
  moduleNameMapper: {
    "\\.(css)$": "<rootDir>/__mocks__/styles.js",
  },
};

module.exports = config;
