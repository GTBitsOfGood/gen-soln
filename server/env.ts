// This file is used by migration.ts and run-action.ts to set-up env variables
import dotenv from "dotenv";

// Add paths to all ".env.*" files here, relative to the root folder since that's where
// yarn will execute this script from. Order matters, ".env.*" file with higher precedence should appear first.
const envFilePaths = [".env.local", ".env"];
const loadEnvForScript = () => {
  envFilePaths.forEach(path => void dotenv.config({ path }));
};

export default loadEnvForScript;
