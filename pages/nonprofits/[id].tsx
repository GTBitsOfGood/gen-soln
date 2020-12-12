import React from "react";

import {
  NextPage,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext
} from "next";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import NonprofitPage from "components/nonprofits/NonprofitPage";
import config from "config";
import { getNonprofitIds, getNonprofitById } from "server/actions/nonprofit";

const NonprofitProfilePage: NextPage<InferGetStaticPropsType<
  typeof getStaticProps
>> = props => {
  const router = useRouter();
  if (router.isFallback) {
    return null;
  }
  if (props.hasError || !props.nonProfit) {
    return <ErrorPage statusCode={404} />;
  }

  return <NonprofitPage nonprofit={props.nonProfit} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getNonprofitIds();

  return { paths: ids.map(config.pages.nonprofit), fallback: true };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.id as string;

  try {
    const nonProfit = await getNonprofitById(id);
    return {
      props: {
        nonProfit
      },
      revalidate: config.nextJSPageRegenerationTime
    };
  } catch (err) {
    return {
      props: {
        hasError: true
      },
      revalidate: config.nextJSPageRegenerationTime
    };
  }
};

export default NonprofitPage;
