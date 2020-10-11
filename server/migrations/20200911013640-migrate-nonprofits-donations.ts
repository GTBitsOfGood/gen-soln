import { MigrationFunction } from "migrate-mongo";
import { Db } from "mongodb";

export const up: MigrationFunction = async (db: Db) => {
  await db
    .collection("nonprofits")
    .update(
      { donations: { $exists: false } },
      { $set: { donations: [] } },
      { multi: true }
    );
};

export const down: MigrationFunction = async (db: Db) => {
  await db
    .collection("nonprofits")
    .update({ donations: [] }, { $unset: { donations: "" } }, { multi: true });
};
