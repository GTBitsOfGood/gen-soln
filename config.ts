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
  jwtSecret: isDevEnv
    ? process.env.DEV_JWT_SECRET
    : process.env.PROD_JWT_SECRET,
  stripePublishable: isDevEnv
    ? process.env.NEXT_PUBLIC_DEV_STRIPE_PUBLISHABLE
    : process.env.NEXT_PUBLIC_PROD_STRIPE_PUBLISHABLE,
  stripeSecret: isDevEnv
    ? process.env.DEV_STRIPE_SECRET
    : process.env.PROD_STRIPE_SECRET,
  pages: {
    index: "/",
    login: "/login",
    donate: (path = "[id]"): string => `/donate/${path}`,
    events: "/events/events"
  },
  apis: {
    login: "/api/login",
    checkToken: "/api/checkToken",
    createDonation: "/api/createDonation",
    paymentIntents: "/api/paymentIntents",
    // Remove this endpoint when we no longer need to redirect from index.ts
    getDefaultNonprofitId: "/api/getDefaultNonprofitId"
  }
};
