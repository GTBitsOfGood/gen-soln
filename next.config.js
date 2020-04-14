const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  webpack(config) {
    const aliasedDirectories = ["components", "utils", "server", "requests"];
    config.resolve.alias["config"] = path.join(__dirname, "config.ts");
    aliasedDirectories.forEach(dir => {
      config.resolve.alias[dir] = path.join(__dirname, dir);
    });

    return config;
  },
  env: {
    STRIPE_PUBLISHABLE: process.env.STRIPE_PUBLISHABLE
  }
};
