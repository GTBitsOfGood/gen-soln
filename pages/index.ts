import { NextPage } from "next";

import { DEFAULT_NON_PROFIT_URL } from "utils/DummyData";
import { pathWithDonate } from "utils/util";

const IndexPage: NextPage = () => {
  return null;
};

IndexPage.getInitialProps = async ({ res }) => {
  /* TODO: For now, we don't show anything and redirect users to a default non-profit's donation page.
   * Modify this behavior when the actual IndexPage UI gets built. Don't use DEFAULT_NON_PROFIT_URL for other
   * purposes for now. */
  res?.writeHead(302, { Location: pathWithDonate(DEFAULT_NON_PROFIT_URL) });
  res?.end();
};

export default IndexPage;
