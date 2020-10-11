import { MigrationFunction } from "migrate-mongo";
import { Db } from "mongodb";

export const up: MigrationFunction = async (db: Db) => {
  await db
    .collection("nonprofits")
    .updateMany({}, { $set: { causes: "OTHER" } });
};
export const down: MigrationFunction = async (db: Db) => {
  await db.collection("nonprofits").updateMany({}, { $unset: { causes: "" } });
};
