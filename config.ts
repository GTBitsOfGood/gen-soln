export default {
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
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
    getNonprofitNames: "/api/getNonprofitNames"
  }
};
