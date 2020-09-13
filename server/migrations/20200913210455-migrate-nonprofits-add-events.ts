import { Db } from "mongodb";
import { MigrationFunction } from "migrate-mongo";

export const up: MigrationFunction = async (db: Db) => {
  await db
    .collection("nonprofits")
    .update({}, { $set: { events: [] } }, { multi: true });
};

export const down: MigrationFunction = async (db: Db) => {
  await db
    .collection("nonprofits")
    .update({}, { $unset: { events: null } }, { multi: true });
};
