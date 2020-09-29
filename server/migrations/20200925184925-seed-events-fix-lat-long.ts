import { Db } from "mongodb";
import { MigrationFunction } from "migrate-mongo";

export const up: MigrationFunction = async (db: Db) => {
  const documents = await db
    .collection("events")
    .find({}, { fields: { _id: 1, address: 1 } })
    .toArray();

  await Promise.all(
    documents.map(({ _id, address }) => {
      // @ts-ignore Address is an object containing location.coordinates
      address.location.coordinates.reverse();
      return db.collection("events").updateOne({ _id }, { $set: { address } });
    })
  );
};

export const down: MigrationFunction = async () => {
  // No down for this -- this was an error on our part in the first event seeding script
};
