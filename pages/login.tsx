import React, { useEffect } from "react";
import {
  NextPage,
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from "next";
import nextCookie from "next-cookies";
import { useRouter } from "next/router";

import config from "config";

import AuthPage from "components/auth/AuthPage";

import { checkToken } from "server/actions/admin";

const LoginPage: NextPage<InferGetServerSidePropsType<
  typeof getServerSideProps
>> = ({ isUserLoggedIn }) => {
  const router = useRouter();

  useEffect(() => {
    isUserLoggedIn && void router.push(config.pages.index);
  }, [router, isUserLoggedIn]);

  return <AuthPage />;
};

export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { token } = nextCookie(context);

  if (token != null) {
    try {
      checkToken(token);
      return {
        props: { isUserLoggedIn: true }
      };
    } catch (error) {
      console.error(error);
    }
  }

  return {
    props: { isUserLoggedIn: false }
  };
};

export default LoginPage;
