import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { InitOptions } from "next-auth";
import Adapters from "next-auth/adapters";

import config from "config";
import AdminTypeORM, { Admin } from "server/auth/AdminTypeORM";
import BitsAuth0Provider from "server/auth/BitsAuth0Provider";

export interface AuthSession {
  user: Admin;
  expires: string;
  accessToken?: string;
}

const options: InitOptions = {
  providers: [BitsAuth0Provider],
  adapter: Adapters.TypeORM.Adapter(
    { type: "mongodb", url: config.db.url as string, ...config.db.options },
    {
      models: {
        User: AdminTypeORM
      }
    }
  ),
  callbacks: {
    session: async (session, user: Admin): Promise<AuthSession> => {
      const newUser = {
        ...session.user,
        ...user
      };

      return {
        ...session,
        user: newUser
      };
    }
  }
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
