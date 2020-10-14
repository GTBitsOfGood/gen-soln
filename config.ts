const env = process.env.FORCE_NODE_ENV ?? process.env.NODE_ENV ?? "development";
const isDevEnv = env === "development";
const isStagingEnv = env === "staging";

console.log(process.env.FORCE_NODE_ENV);
console.log({ isDevEnv, isStagingEnv, node_env: process.env.NODE_ENV });

// works for server-side env variables only
const getServerEnvVar = (
  DEV_ENV_VAR_NAME: string,
  PROD_ENV_VAR_NAME: string,
  STAGING_ENV_VAR_NAME?: string
) => {
  if (isDevEnv || STAGING_ENV_VAR_NAME == null) {
    return process.env[DEV_ENV_VAR_NAME];
  }
  if (isStagingEnv) {
    return process.env[STAGING_ENV_VAR_NAME];
  }
  return process.env[PROD_ENV_VAR_NAME];
};

export default {
  db: {
    name: getServerEnvVar("DEV_DB_NAME", "PROD_DB_NAME", "STAGING_DB_NAME"),
    url: getServerEnvVar("DEV_DB_URL", "PROD_DB_URL", "STAGING_DB_URL"),
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  },
  stripe: {
    publishable_key:
      isDevEnv || isStagingEnv
        ? process.env.NEXT_PUBLIC_DEV_STRIPE_PUBLISHABLE
        : process.env.NEXT_PUBLIC_PROD_STRIPE_PUBLISHABLE,
    secret_key: getServerEnvVar("DEV_STRIPE_SECRET", "PROD_STRIPE_SECRET")
  },
  jwtSecret: getServerEnvVar("DEV_JWT_SECRET", "PROD_JWT_SECRET"),
  baseUrl: getServerEnvVar("DEV_BASE_URL", "PROD_BASE_URL", "STAGING_BASE_URL"),
  pages: {
    index: "/",
    login: "/login",
    signup: "/signup",
    donate: (path = "[id]"): string => `/donate/${path}`,
    events: "/events",
    event: (path = "[id]"): string => `/events/${path}`
  },
  apis: {
    login: "/api/login",
    logDonation: "/api/logDonation",
    createPaymentIntent: "/api/createPaymentIntent",
    recoverPassword: "/api/recoverPassword",
    getUpcomingEvents: "/api/getUpcomingEvents",
    getNearestEvents: "/api/getNearestEvents"
  },
  googleMapsClientKey: isDevEnv
    ? process.env.NEXT_PUBLIC_DEV_GOOGLE_MAPS_KEY
    : process.env.NEXT_PUBLIC_PROD_GOOGLE_MAPS_KEY,
  googleMapsServerKey: process.env.SERVER_GOOGLE_MAPS_KEY
};
