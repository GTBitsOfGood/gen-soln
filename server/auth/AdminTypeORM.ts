import Adapters, { TypeORMUserModel } from "next-auth/adapters";
/**
 * This class has an "id" field but because TypeORM is not
 * really designed for MongoDB (NOSQL; "_id"), we can't include it as part of the type.
 * NOTE: You can access the "id" field on this class, but if we include it in the
 * type, a NULL "id" field will be created for all users
 */
export class Admin extends TypeORMUserModel {
  constructor(
    name?: string,
    email?: string,
    image?: string,
    emailVerified?: Date
  ) {
    super(name, email, image, emailVerified);
  }
}

const AdminSchema = {
  name: "Admin",
  target: Admin,
  columns: {
    ...Adapters.TypeORM.Models.User.schema.columns
  }
};

export default {
  model: Admin,
  schema: AdminSchema
};
