import React from "react";
import {
  NextPage,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext
} from "next";
import ErrorPage from "next/error";
import { Dropdown } from "utils/types";
import {
  getNonprofitIds,
  getNonprofitNamesWithIds,
  getNonprofitById
} from "server/actions/nonprofit";
import DonationPage from "components/donation/DonationPage";
import config from "config";
import { useRouter } from "next/router";

const NonprofitDonationPage: NextPage<InferGetStaticPropsType<
  typeof getStaticProps
>> = props => {
  const router = useRouter();
  if (router.isFallback) {
    return null;
  } else if (props.nonprofit) {
    return <DonationPage {...props} />;
  } else {
    return <ErrorPage statusCode={404} />;
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getNonprofitIds();

  return { paths: ids.map(config.pages.donate), fallback: true };
};

// eslint-disable-next-line
export const getStaticProps = async (context: GetStaticPropsContext) => {
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
      props: {},
      revalidate: 10
    };
  }
};

export default NonprofitDonationPage;
