export default {
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
  stripeSecret: process.env.STRIPE_SECRET,
  stripePublishable: process.env.STRIPE_PUBLISHABLE,
  pages: {
    index: "/",
    login: "/login"
  },
  apis: {
    login: "/api/login",
    signup: "/api/signup",
    checkToken: "/api/checkToken",
    createDonation: "/api/createDonation",
    createNonprofit: "/api/createNonprofit",
    // Remove this endpoint when we no longer need to redirect from index.ts
    getDefaultNonprofitId: "/api/getDefaultNonprofitId"
  }
};
