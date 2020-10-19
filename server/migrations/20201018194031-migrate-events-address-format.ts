import faker from "faker";
import { MigrationFunction } from "migrate-mongo";
import { Db } from "mongodb";

faker.seed(1);
const MAIN_TEXT_OPTIONS = [
  "Public Library",
  "Statue of Liberty",
  "Georgia Tech",
  "Capitol Building",
  "Miami Beach",
  "Lake Tahoe",
  "Animal Shelter",
  "Food Bank",
  "Community Park"
];

export const up: MigrationFunction = async (db: Db) => {
  const documents = await db
    .collection("events")
    .find({}, { fields: { _id: 1, address: 1 } })
    .toArray();
  await Promise.all(
    documents.map(({ _id, address }) =>
      db.collection("events").updateOne(
        { _id },
        {
          $set: {
            "address.text": {
              main: faker.random.arrayElement(MAIN_TEXT_OPTIONS),
              // @ts-ignore: address.text is of type string
              secondary: address.text
            }
          }
        }
      )
    )
  );
};

export const down: MigrationFunction = async (db: Db) => {
  const documents = await db
    .collection("events")
    .find({}, { fields: { _id: 1, address: 1 } })
    .toArray();
  await Promise.all(
    documents.map(({ _id, address }) =>
      db.collection("events").updateOne(
        { _id },
        // @ts-ignore: address.text was set to type { main: string, secondary: string } in up()
        { $set: { "address.text": address.text.secondary } }
      )
    )
  );
};
