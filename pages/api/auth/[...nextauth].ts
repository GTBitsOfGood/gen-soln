import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { InitOptions } from "next-auth";
import Adapters from "next-auth/adapters";

import config from "config";
import AdminTypeORM, { Admin } from "server/auth/AdminTypeORM";
import BitsAuth0Provider from "server/auth/BitsAuth0Provider";

export type AuthSession = {
  user: Admin;
  accessToken?: string;
  expires: string;
};

const options: InitOptions = {
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
  callbacks: {
    session: async (session, user) => {
      return {
        ...session,
        user: {
          ...session.user,
          ...user
        }
      };
    }
  }
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
