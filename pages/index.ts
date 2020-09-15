import { useEffect } from "react";
import { NextPage, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import urls from "config";

import { getDefaultNonprofitId } from "server/actions/nonprofit";

const IndexPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  defaultNonprofitId
}) => {
  /* TODO: For now, we don't show anything and redirect users to a default non-profit's donation page.
   * Modify this behavior when the actual IndexPage UI gets built. */
  const router = useRouter();

  useEffect(() => {
    void router.push(urls.pages.donate(defaultNonprofitId));
  }, [router, defaultNonprofitId]);

  return null;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getStaticProps = async () => {
  return { props: { defaultNonprofitId: await getDefaultNonprofitId() } };
};

export default IndexPage;
