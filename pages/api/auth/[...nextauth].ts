import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import Adapters from "next-auth/adapters";

import config from "config";
import { Admin, AdminTypeORM } from "server/auth/AdminTypeORM";
import BitsAuth0Provider from "server/auth/BitsAuth0Provider";

export type AuthSession = {
  user: Admin;
  expiresAt: string;
  accessToken?: string;
};

const options = {
  providers: [BitsAuth0Provider],
  /* The typescript definition for this function is wrong:
  See src for correct definition: https://github.com/nextauthjs/next-auth/blob/main/src/adapters/typeorm/index.js */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  adapter: (Adapters.TypeORM.Adapter as any)(config.db.url, {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
    models: {
      User: AdminTypeORM
    }
  }),
  database: config.db.url,
  events: {},
  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    session: (session: any, user: Admin): Promise<AuthSession> => {
      // See comment in @link /server/models/User.ts for why the User class does not include an "id" attribute
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
      const newUser: any = {
        ...session.user, // eslint-disable-line @typescript-eslint/no-unsafe-member-access
        id: (user as any)["id"], // eslint-disable-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        emailVerified: user.emailVerified,
        image: user.image
      };
      return Promise.resolve({
        ...session,
        user: newUser // eslint-disable-line @typescript-eslint/no-unsafe-assignment
      } as AuthSession);
    }
  }
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
