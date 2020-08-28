import React from "react";
import { NextPage } from "next";
import nextCookie from "next-cookies";
import Router from "next/router";

import config from "config";

import AuthPage from "components/auth/AuthPage";

import { checkToken } from "server/actions/admin";

import { checkTokenRequest } from "requests/admin";

const LoginPage: NextPage = () => <AuthPage />;

LoginPage.getInitialProps = async ctx => {
  try {
    const { token } = nextCookie(ctx);
    if (token != null) {
      if (ctx.res) {
        // server-side code:
        checkToken({ token });
        ctx.res.writeHead(302, { Location: config.pages.index }).end();
      } else {
        // client-side code:
        await checkTokenRequest(token);
        void Router.push(config.pages.index);
      }
    }
  } catch (e) {
    console.log(e);
  }
  // Literally return any object instead of an empty one to allow Next.js optimization
  return { foo: "bar" };
};

export default LoginPage;
