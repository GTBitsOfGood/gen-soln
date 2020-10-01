import { Db } from "mongodb";
import { MigrationFunction } from "migrate-mongo";
import { DEFAULT_IMAGE } from "server/models/event";

export const up: MigrationFunction = async (db: Db) => {
  await db
    .collection("events")
    .updateMany(
      { image: { $exists: false } },
      { $set: { image: DEFAULT_IMAGE } }
    );
};

export const down: MigrationFunction = async () => {
  // No down for this -- we forgot to store image field for Events in our previous seed script
};
