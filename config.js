export default {
  baseUrl: "http://localhost:3000/",
  dbUrl: process.env.DB_URL,
  dbName: process.env.DB_NAME,
  apis: {
    login: "/api/login",
    signup: "/api/signup",
    checkToken: "/api/checkToken",
    createDonation: "/api/createDonation",
    createNonprofit: "/api/createNonprofit"
  }
};