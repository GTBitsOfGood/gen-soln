import { Db } from "mongodb";
import { MigrationFunction } from "migrate-mongo";

const nonprofits = ["46099993", "64357724", "92232372"];

export const up: MigrationFunction = async (db: Db) => {
  await db
    .collection("nonprofits")
    .updateMany({ _id: { $in: nonprofits } }, { $set: { stripeAccount: "" } });
};

export const down: MigrationFunction = async (db: Db) => {
  await db
    .collection("nonprofits")
    .updateMany(
      { _id: { $in: nonprofits } },
      { $unset: { stripeAccount: "" } }
    );
};
