import React from "react";

import {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext
} from "next";

import EventsPageFiltered from "components/events/EventsPageFiltered";
import EventsPageUnfiltered from "components/events/EventsPageUnfiltered";
import {
  getUpcomingEventsCardData,
  getUpcomingEventsCardDataCount,
  getByCausesEventsCardData
} from "server/actions/events";
import { getFilterValuesInQuery } from "utils/filters";

const EventsNextPage: NextPage<InferGetServerSidePropsType<
  typeof getServerSideProps
>> = props => {
  switch (props.type) {
    case "WITHOUT_QUERY":
      return (
        <EventsPageUnfiltered
          upcomingEventsFirstPageData={props.upcomingEventsFirstPageData}
        />
      );
    case "WITH_QUERY":
      return <EventsPageFiltered />;
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

  if (Object.keys(context.query).length === 0) {
    const date = new Date();
    const upcomingEventsTotalCount = await getUpcomingEventsCardDataCount(date);
    const upcomingEventsFirstPageData = await getUpcomingEventsCardData({
      date: date.toJSON(),
      page: 0,
      totalCount: upcomingEventsTotalCount,
      isLastPage: false
    });

    return {
      props: {
        ...commonProps,
        upcomingEventsFirstPageData,
        type: "WITHOUT_QUERY" as const
      }
    };
  } else {
    const query = getFilterValuesInQuery(context.query, "cause");
    /*upcomingEventsFirstPageData = */ await getByCausesEventsCardData(query);
  }

  return {
    props: {
      ...commonProps,
      type: "WITH_QUERY" as const
    }
  };
};

export default EventsNextPage;
