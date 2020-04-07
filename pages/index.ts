import { NextPage } from "next";
import Router from "next/router";
import { DEFAULT_NON_PROFIT_URL } from "utils/DummyData";
import { pathWithDonate } from "utils/util";

const IndexPage: NextPage = () => {
  /* TODO: For now, we don't show anything and redirect users to a default non-profit's donation page.
   * Modify this behavior when the actual IndexPage UI gets built. Don't use DEFAULT_NON_PROFIT_URL for other
   * purposes for now. */
  return null;
};

/* You may see a resource not found error in the console when a request to this page comes from '/login'
 * but that can be ignored since it doesn't effect the redirection behavior. Be cautious about replacing
 * getInitialProps with getServerSideProps; while that will get rid of the above error, the redirection behavior
 * may fail on certain browsers like Safari. */
IndexPage.getInitialProps = async ({ res }) => {
  const url = pathWithDonate(DEFAULT_NON_PROFIT_URL);
  if (res) {
    res.writeHead(302, { Location: url }).end();
  } else {
    Router.push(url);
  }

  // Literally return any object instead of an empty one to allow Next.js optimization
  return { foo: "bar" };
};

export default IndexPage;
