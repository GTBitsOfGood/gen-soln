import mongoose from "mongoose";
import Stripe from "stripe";

import config from "config";

const MongoConnect = async () => {
  if (mongoose.connections[0].readyState) return;

  await mongoose
    .connect(config.db.url, {
      ...config.db.options,
      dbName: config.db.name
    })
    .catch(error => {
      console.error("Database connection failed. 👇🏼");
      console.error(" > " + error);

      throw error;
    });
};

export default MongoConnect;

export function stripeConstructor() {
  return new Stripe(config.stripe.secret_key, {
    apiVersion: "2020-03-02"
  });
}
