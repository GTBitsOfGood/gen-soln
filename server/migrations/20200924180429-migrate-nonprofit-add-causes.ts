import { Db } from "mongodb";
import { MigrationFunction } from "migrate-mongo";

export const up: MigrationFunction = async (db: Db) => {
  await db
    .collection("nonprofits")
    .updateMany({}, { $set: { causes: "OTHER" } });
};
export const down: MigrationFunction = async (db: Db) => {
  await db.collection("nonprofits").updateMany({}, { $unset: { causes: "" } });
};
