import { Db } from "mongodb";
import { MigrationFunction } from "migrate-mongo";
import { hashPassword } from "server/actions/admin";

const admin = {
  firstName: "Johnny",
  lastName: "Dogooder",
  email: "hello@bitsofgood.org",
  password: hashPassword("123456")
};

export const up: MigrationFunction = async (db: Db) => {
  const idObject = await db
    .collection("nonprofits")
    .findOne({}, { projection: { _id: 1 } });

  await db
    .collection("admins")
    .insert({ ...admin, nonprofitId: idObject?._id });
};

export const down: MigrationFunction = async (db: Db) => {
  await db.collection("admins").deleteOne({ email: admin.email });
};
