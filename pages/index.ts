import { NextPage } from "next";
import Router from "next/router";
import config from "config";

import { getDefaultNonprofitId } from "server/actions/nonprofit";

import { getDefaultNonprofitIdRequest } from "requests/nonprofit";

const IndexPage: NextPage = () => {
  /* TODO: For now, we don't show anything and redirect users to a default non-profit's donation page.
   * Modify this behavior when the actual IndexPage UI gets built. */
  return null;
};

/* You may see a resource not found error in the console when a request to this page comes from '/login'
 * but that can be ignored since it doesn't effect the redirection behavior. Be cautious about replacing
 * getInitialProps with getServerSideProps; while that will get rid of the above error, the redirection behavior
 * may fail on certain browsers like Safari. */
IndexPage.getInitialProps = async ({ res }) => {
  if (res) {
    // server-side code:
    const id = await getDefaultNonprofitId();
    res.writeHead(302, { Location: config.pages.donate(id) }).end();
  } else {
    // client-side code:
    const id = await getDefaultNonprofitIdRequest();
    void Router.push(config.pages.donate(id));
  }

  // Literally return any object instead of an empty one to allow Next.js optimization
  return { foo: "bar" };
};

export default IndexPage;
