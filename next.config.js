const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  env: {
    STRIPE_PUBLISHABLE: process.env.STRIPE_PUBLISHABLE
  }
};
