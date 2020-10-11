import React from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import config from "config";
import {
  NextPage,
  GetStaticPaths,
  InferGetStaticPropsType,
  GetStaticPropsContext
} from "next";
import ErrorPage from "next/error";
import { useRouter } from "next/router";

import DonationPage from "components/donation/DonationPage";
import {
  getNonprofitIds,
  getNonprofitNamesWithIds,
  getNonprofitById
} from "server/actions/nonprofit";
import { Dropdown } from "utils/types";

const NonprofitDonationPage: NextPage<InferGetStaticPropsType<
  typeof getStaticProps
>> = props => {
  const router = useRouter();
  if (router.isFallback) {
    return null;
  } else if (props.nonprofit) {
    return (
      <Elements
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        stripe={loadStripe(config.stripe.publishable_key!, {
          stripeAccount: props.nonprofit.stripeAccount
        })}
      >
        <DonationPage {...props} />
      </Elements>
    );
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
