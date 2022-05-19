module.exports = {
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "\\.svg$": "<rootDir>/src/__mocks__/fileMock.js",
  },
  testEnvironment: "jsdom",
};
