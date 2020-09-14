import React, { useEffect } from "react";
import {
  NextPage,
  GetServerSidePropsContext,
  InferGetServerSidePropsType
} from "next";
import nextCookie from "next-cookies";
import { useRouter } from "next/router";

import urls from "config";

import AuthPage from "components/auth/AuthPage";

import { checkToken } from "server/actions/admin";

const LoginPage: NextPage<InferGetServerSidePropsType<
  typeof getServerSideProps
>> = ({ isUserLoggedIn }) => {
  const router = useRouter();

  useEffect(() => {
    isUserLoggedIn && void router.push(urls.pages.donate(urls.pages.index));
  }, [router, isUserLoggedIn]);

  return <AuthPage />;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = (context: GetServerSidePropsContext) => {
  const { token } = nextCookie(context);

  try {
    checkToken(token);
    return {
      props: { isUserLoggedIn: true }
    };
  } catch (error) {
    console.error(error);
    return {
      props: { isUserLoggedIn: false }
    };
  }
};

export default LoginPage;
