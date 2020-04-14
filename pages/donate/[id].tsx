import React from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";

import { Dropdown } from "utils/types";

import {
  getNonprofitIds,
  getNonprofitNames,
  getNonprofitById
} from "server/actions/nonprofit";

import DonationPage from "components/donation/DonationPage";

import urls from "config";

const NonprofitDonationPage: NextPage<React.ComponentProps<
  typeof DonationPage
>> = props => <DonationPage {...props} />;

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getNonprofitIds();

  return { paths: ids.map(urls.pages.donate), fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  /* For now, getNonprofitById excludes Nonprofit's donation field. If you were fetching it, ensure
   * that donation IDs are mapped to a string array so that the nonprofit object is JSON serializable. */
  const [names, nonprofit] = await Promise.all([
    getNonprofitNames(),
    getNonprofitById(id)
  ]);

  const items = names.map(
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
    }
  };
};

export default NonprofitDonationPage;
