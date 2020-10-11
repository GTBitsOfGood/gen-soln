import { MigrationFunction } from "migrate-mongo";
import { Db } from "mongodb";

import { DEFAULT_IMAGE } from "server/models/event";

export const up: MigrationFunction = async (db: Db) => {
  await db
    .collection("events")
    .updateMany(
      { image: { $exists: true } },
      { $set: { image: DEFAULT_IMAGE } }
    );
};

export const down: MigrationFunction = async () => {
  // No down for this -- we store the image field using CSS Events in our previous seed script
};
