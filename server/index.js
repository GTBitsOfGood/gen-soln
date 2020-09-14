import mongoose from "mongoose";
import config from "config";
import Stripe from "stripe";

const MongoConnect = async () => {
  if (mongoose.connections[0].readyState) return;

  await mongoose
    .connect(config.dbUrl, {
      ...config.dbOptions,
      dbName: config.dbName
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
