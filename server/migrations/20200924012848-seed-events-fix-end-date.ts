import { MigrationFunction } from "migrate-mongo";
import { Db } from "mongodb";

const MILLISECONDS_IN_AN_HOUR = 60 * 60 * 1000;

export const up: MigrationFunction = async (db: Db) => {
  await db
    .collection("events")
    .updateMany({ $expr: { $gt: ["$startDate", "$endDate"] } }, [
      { $set: { endDate: { $add: ["$startDate", MILLISECONDS_IN_AN_HOUR] } } }
    ]);
};

export const down: MigrationFunction = async () => {
  // No down for this -- this was an error on our part in the first event seeding script
};
