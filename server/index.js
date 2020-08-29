import mongoose from "mongoose";
import config from "config";

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
