const mongoose = require("mongoose");

export default async () => {
  if (mongoose.connections[0].readyState) return;

  await mongoose
    .connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
    .catch(error => {
      console.error("Database connection failed. 👇🏼");
      console.error(" > " + error);
    });
};
