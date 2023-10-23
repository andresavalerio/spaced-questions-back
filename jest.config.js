/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["dist", "e2e"],
  rootDir: "./",
  modulePaths: ["src"],
  moduleFileExtensions: ["js", "json", "ts"],
  moduleDirectories: ["node_modules", "src"],
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
};
