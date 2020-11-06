import React from "react";

import {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext
} from "next";

import { getFilterValuesInQuery, getFilterCountFromQuery } from "utils/filters";

const NonprofitsNextPage: NextPage<InferGetServerSidePropsType<
  typeof getServerSideProps
>> = props => {
  switch (props.type) {
    case "WITHOUT_QUERY":
      return null; // replace
    case "WITH_QUERY":
      return null; // replace
    default: {
      const _exhaustiveCheck: never = props;
      return _exhaustiveCheck;
    }
  }
};

// eslint-disable-next-line @typescript-eslint/require-await
export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  // Don't remove the async otherwise InferGetStaticPropsType won't work as expected
  // TODO: Use this eventually, if we need common props between filtered and unfiltered event pages.
  const commonProps = {};

  if (getFilterCountFromQuery(context.query) === 0) {
    return {
      props: {
        ...commonProps,
        type: "WITHOUT_QUERY" as const
      }
    };
  } else {
    // There's a query
  }

  return {
    props: {
      ...commonProps,
      type: "WITH_QUERY" as const
    }
  };
};

export default NonprofitsNextPage;
