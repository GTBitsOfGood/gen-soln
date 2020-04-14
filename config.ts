export default {
  // These env variables client side may not work
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  jwtSecret: process.env.JWT_SECRET,
  stripeSecret: process.env.STRIPE_SECRET,
  pages: {
    index: "/",
    login: "/login",
    donate: (path = "[id]") => `/donate/${path}`
  },
  apis: {
    login: "/api/login",
    signup: "/api/signup",
    checkToken: "/api/checkToken",
    createDonation: "/api/createDonation",
    createNonprofit: "/api/createNonprofit",
    paymentIntents: "/api/paymentIntents",
    // Remove this endpoint when we no longer need to redirect from index.ts
    getDefaultNonprofitId: "/api/getDefaultNonprofitId"
  }
};
