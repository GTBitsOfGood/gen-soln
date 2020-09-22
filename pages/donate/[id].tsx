import React from "react";
import {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext
} from "next";

import { Dropdown } from "utils/types";

import {
  getNonprofitIds,
  getNonprofitNamesWithIds,
  getNonprofitById
} from "server/actions/nonprofit";

import DonationPage from "components/donation/DonationPage";

import config from "config";
import Head from "next/head";
import DefaultErrorPage from "next/error";

const NonprofitDonationPage: NextPage<InferGetStaticPropsType<
  typeof getStaticProps
>> = props => {
  if (props.nonprofit) {
    // @ts-ignore temp
    return <DonationPage {...props} />;
  } else {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
          <title>404</title>
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    );
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getNonprofitIds();

  return { paths: ids.map(config.pages.donate), fallback: true };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const id = context.params?.id as string;

  /* For now, getNonprofitById excludes Nonprofit's donation field. If you were fetching it, ensure
   * that donation IDs are mapped to a string array so that the nonprofit object is JSON serializable. */
  try {
    const [namesWithIds, nonprofit] = await Promise.all([
      getNonprofitNamesWithIds(),
      getNonprofitById(id)
    ]);

    const items = namesWithIds.map(
      ({ _id, name }): Dropdown => ({
        value: _id,
        text: name
      })
    );

    return {
      props: {
        nonprofit,
        items,
        selectedValue: id
      },
      revalidate: 10
    };
  } catch (err) {
    return {
      props: {}
    };
  }
};

export default NonprofitDonationPage;
