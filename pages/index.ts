import { useEffect } from "react";

import config from "config";
import { NextPage, InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import { getDefaultNonprofitId } from "server/actions/nonprofit";

const IndexPage: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  defaultNonprofitId
}) => {
  /* TODO: For now, we don't show anything and redirect users to a default non-profit's donation page.
   * Modify this behavior when the actual IndexPage UI gets built. */
  const router = useRouter();

  useEffect(() => {
    void router.push(config.pages.donate(defaultNonprofitId));
  }, [router, defaultNonprofitId]);

  return null;
};

export const getStaticProps = async () => {
  return { props: { defaultNonprofitId: await getDefaultNonprofitId() } };
};

export default IndexPage;
