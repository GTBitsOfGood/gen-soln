import React from "react";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";

import { Dropdown } from "utils/types";

import {
  getNonprofitIds,
  getNonprofitNamesWithIds,
  getNonprofitById
} from "server/actions/nonprofit";

import DonationPage from "components/donation/DonationPage";

import config from "config";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

interface Props {
  stripeAccount: string;
}

const NonprofitDonationPage: NextPage<
  Props & React.ComponentProps<typeof DonationPage>
> = ({ stripeAccount, ...props }) => (
  <Elements
    stripe={loadStripe(config.stripe.publishable_key!, { stripeAccount })}
  >
    <DonationPage {...props} />
  </Elements>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getNonprofitIds();

  return { paths: ids.map(config.pages.donate), fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.id as string;

  /* For now, getNonprofitById excludes Nonprofit's donation field. If you were fetching it, ensure
   * that donation IDs are mapped to a string array so that the nonprofit object is JSON serializable. */
  const [namesWithIds, nonprofit] = await Promise.all([
    getNonprofitNamesWithIds(),
    getNonprofitById(id)
  ]);

  const stripeAccount = nonprofit.stripeAccount;
  delete nonprofit.stripeAccount;

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
      selectedValue: id,
      stripeAccount
    }
  };
};

export default NonprofitDonationPage;
