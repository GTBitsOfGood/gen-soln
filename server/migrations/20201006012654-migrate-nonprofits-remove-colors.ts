import { Db } from "mongodb";
import { MigrationFunction } from "migrate-mongo";

export const up: MigrationFunction = async (db: Db) => {
  await db.collection("nonprofits").updateMany(
    {},
    {
      $unset: { primaryColor: "", secondaryColor: "" }
    }
  );
};

export const down: MigrationFunction = async (db: Db) => {
  await db.collection("nonprofits").updateMany(
    {},
    {
      $set: { primaryColor: "#444444", secondaryColor: "#222222" } // some HEX colors
    }
  );
};
