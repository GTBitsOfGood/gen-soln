export default {
  db: {
    name: process.env.DB_NAME,
    url: process.env.DB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  },
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE,
    secretKey: process.env.STRIPE_SECRET
  },
  googleMaps: {
    clientKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY,
    serverKey: process.env.SERVER_GOOGLE_MAPS_KEY
  },
  jwtSecret: process.env.JWT_SECRET,
  baseUrl: process.env.BASE_URL,
  pages: {
    index: "/",
    login: "/login",
    signup: "/signup",
    donate: (path = "[id]"): string => `/donate/${path}`,
    events: "/events",
    event: (path = "[id]"): string => `/events/${path}`,
    nonprofit: (path = "[id]"): string => `/nonprofits/${path}`
  },
  apis: {
    login: "/api/login",
    logDonation: "/api/logDonation",
    createPaymentIntent: "/api/createPaymentIntent",
    recoverPassword: "/api/recoverPassword",
    getUpcomingEvents: "/api/getUpcomingEvents",
    getNearestEvents: "/api/getNearestEvents",
    getFilteredEvents: "/api/getFilteredEvents"
  },
  nextJSPageRegenerationTime: 10 // Amount of seconds after which incremental static regeneration of Next.js pages can occur
};
