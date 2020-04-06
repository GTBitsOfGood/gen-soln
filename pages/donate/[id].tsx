import React from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";

import { nonprofitsURLMap } from "utils/DummyData";
import { Dropdown } from "utils/types";
import { pathWithDonate } from "utils/util";

import DonationPage from "components/donation/DonationPage";

const NonprofitDonationPage: NextPage<React.ComponentProps<
  typeof DonationPage
>> = props => {
  // TODO: Pass this nonprofit object to DonationPage
  return <DonationPage {...props} />;
};

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: Get list of non-profit URLs we support from the back-end; for now, use DummyData.
  // Keep in mind, "You should not fetch an API route from getStaticProps — instead, you can write the server-side code directly in getStaticProps."
  const paths: string[] = [];

  nonprofitsURLMap.forEach((_, key) => {
    paths.push(pathWithDonate(key));
  });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // TODO: Get all information about non-profit with URL = params.id, also get the list of all non-profit names and URLs; for now, use DummyData.
  // Again, write server-side code directly, don't make a request to our API.
  const items: Dropdown[] = [];
  nonprofitsURLMap.forEach(({ name }, key) => {
    items.push({ text: name, value: key });
  });

  const id = params?.id as string;

  return {
    props: { nonprofit: nonprofitsURLMap.get(id), items, selectedValue: id }
  };
};

export default NonprofitDonationPage;
