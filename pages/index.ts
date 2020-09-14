import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import urls from "config";

import { getDefaultNonprofitIdRequest } from "requests/nonprofit";

const IndexPage: NextPage = () => {
  /* TODO: For now, we don't show anything and redirect users to a default non-profit's donation page.
   * Modify this behavior when the actual IndexPage UI gets built. */
  const router = useRouter();

  useEffect(() => {
    const fn = async () => {
      const id = await getDefaultNonprofitIdRequest();
      void router.push(urls.pages.donate(id));
    };

    void fn();
  }, [router]);

  return null;
};

export default IndexPage;
