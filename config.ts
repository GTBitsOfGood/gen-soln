const isDevEnv = process.env.NODE_ENV === "development";

export default {
  dbName: isDevEnv ? process.env.DEV_DB_NAME : process.env.PROD_DB_NAME,
  dbUrl: isDevEnv ? process.env.DEV_DB_URL : process.env.PROD_DB_URL,
  dbOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  stripe: {
    publishable_key: isDevEnv
      ? process.env.NEXT_PUBLIC_DEV_STRIPE_PUBLISHABLE
      : process.env.NEXT_PUBLIC_PROD_STRIPE_PUBLISHABLE,
    secret_key: isDevEnv
      ? process.env.DEV_STRIPE_SECRET
      : process.env.PROD_STRIPE_SECRET
  },
  jwtSecret: isDevEnv
    ? process.env.DEV_JWT_SECRET
    : process.env.PROD_JWT_SECRET,
  baseUrl: isDevEnv ? process.env.DEV_BASE_URL : process.env.PROD_BASE_URL,
  pages: {
    index: "/",
    login: "/login",
    donate: (path = "[id]"): string => `/donate/${path}`,
    events: "/events"
  },
  apis: {
    login: "/api/login",
    checkToken: "/api/checkToken",
    logDonation: "/api/logDonation",
    createPaymentIntent: "/api/createPaymentIntent",
    recoverPassword: "/api/recoverPassword",
    // Remove this endpoint when we no longer need to redirect from index.ts
    getDefaultNonprofitId: "/api/getDefaultNonprofitId"
  }
};
