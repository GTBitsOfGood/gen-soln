import mongoose from "mongoose";
import config from "config";

export default async () => {
  if (mongoose.connections[0].readyState) return;

  console.log("db_url" + config.dbUrl);
  console.log("db_name" + config.dbName);
  console.log("jwt_secret" + config.jwtSecret);
  console.log("stripe_secret" + config.stripeSecret);

  await mongoose
    .connect(config.dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      dbName: config.dbName
    })
    .catch(error => {
      console.error("Database connection failed. 👇🏼");
      console.error(" > " + error);

      throw error;
    });
};
