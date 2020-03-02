const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  env: {
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME
  },
  webpack(config) {
    const aliasedDirectories = ["components", "utils", "server"];
    aliasedDirectories.forEach(dir => {
      config.resolve.alias[dir] = path.join(__dirname, dir);
    });

    return config;
  }
};
