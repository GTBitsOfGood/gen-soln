import React from "react";
import urls from "config";
import nextCookie from "next-cookies";
import Router from "next/router";
import { NextPage, GetStaticProps, GetStaticPaths } from "next";

import { Dropdown } from "utils/types";
import { pathWithDonate } from "utils/util";
import { checkToken } from "requests/admin";

import {
  getNonprofitIds,
  getNonprofitNames,
  getNonprofitById
} from "server/actions/nonprofit";

import DonationPage from "components/donation/DonationPage";

const NonprofitDonationPage: NextPage<React.ComponentProps<
  typeof DonationPage
>> = props => <DonationPage {...props} />;

// NonprofitDonationPage.getInitialProps = async (ctx) => {
//     const { token } = nextCookie(ctx);

//     try {
//       const admin = await checkToken(token);
//       return admin;
//     } catch (error) {
//       if (ctx.res) {
//         ctx.res.writeHead(302, { Location: urls.pages.login });
//         ctx.res.end();
//       } else {
//         Router.push(urls.pages.login);
//       }
//     }
// }

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getNonprofitIds();

  return { paths: ids.map(id => pathWithDonate(id)), fallback: false };
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
