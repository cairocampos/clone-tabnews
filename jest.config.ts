import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";
import dotenv from "dotenv";
import { join } from "node:path";

dotenv.config({
  path: join(__dirname, ".env.development"),
});

export default {
  rootDir: ".",
  preset: "ts-jest",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  testRegex: ".*\\.test\\.ts$",
  moduleFileExtensions: ["js", "json", "ts"],
  testEnvironment: "node",
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>",
  }),
  testTimeout: 60000,
};
