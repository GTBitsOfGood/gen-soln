import { Db } from "mongodb";
import { MigrationFunction } from "migrate-mongo";

const stripeTestNonprofit = "American Red Cross";
const stripeAccount = "acct_1HRQtBDVsYlAZnQ1";

export const up: MigrationFunction = async (db: Db) => {
  await db
    .collection("nonprofits")
    .updateOne({ name: stripeTestNonprofit }, { $set: { stripeAccount } });
};

export const down: MigrationFunction = async (db: Db) => {
  await db
    .collection("nonprofits")
    .updateOne({ name: stripeTestNonprofit }, { $set: { stripeAccount: "" } });
};
