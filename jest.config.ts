// import type { Config } from "@jest/types";
// // Sync object
// const config: Config.InitialOptions = {
//   verbose: true,
//   transform: {
//     "^.+\\.ts?$": "ts-jest",
//   },
// };
// export default config;

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // dir:'./src'
});
const jestConfig = createJestConfig();

module.exports = jestConfig;
