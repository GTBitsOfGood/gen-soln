/**
 * This class has an "id" field but because TypeORM is not
 * really designed for MongoDB (NOSQL; "_id"), we can't include it as part of the type.
 * NOTE: You can access the "id" field on this class, but if we include it in the
 * type, a NULL "id" field will be created for all users
 */
export class Admin {
  // ts-ignored because sometimes set through field injection
  // @ts-ignore (above)
  firstName: string;
  // @ts-ignore (above)
  lastName: string;
  // @ts-ignore (above)
  email: string;
  // @ts-ignore (above)
  emailVerified: boolean;
  // @ts-ignore (above)
  image: string;

  // @ts-ignore Unknown profile type
  constructor(profile) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    // TypeORM does field injection when loading from DB, meaning profile can be null
    if (profile) {
      this.firstName = profile.firstName;
      this.lastName = profile.lastName;
      this.email = profile.email;
      this.emailVerified = profile.emailVerified;
      this.image = profile.image;
    }
  }
}

const AdminSchema = {
  name: "Admin",
  target: Admin,
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true
    },
    firstName: {
      type: "varchar",
      nullable: true
    },
    lastName: {
      type: "string",
      nullable: false
    },
    email: {
      type: "varchar",
      unique: true,
      nullable: true
    },
    emailVerified: {
      type: "boolean",
      nullable: true
    },
    image: {
      type: "varchar",
      nullable: true
    },
    createdAt: {
      type: "timestamp",
      createDate: true
    },
    updatedAt: {
      type: "timestamp",
      updateDate: true
    }
  }
};

export default {
  model: Admin,
  schema: AdminSchema
};
