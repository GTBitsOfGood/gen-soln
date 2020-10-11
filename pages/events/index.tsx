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
import { getCauses } from "server/actions/nonprofit";
import { Dropdown } from "utils/types";
import { returnQueryAsArray } from "utils/util";

const EventsNextPage: NextPage<InferGetServerSidePropsType<
  typeof getServerSideProps
>> = props => {
  const { timeFilterOptions, causesFilterOptions } = props;
  switch (props.type) {
    case "WITHOUT_QUERY":
      return (
        <EventsPageUnfiltered
          timeFilterOptions={timeFilterOptions}
          causesFilterOptions={causesFilterOptions}
          upcomingEventsFirstPageData={props.upcomingEventsFirstPageData}
        />
      );
    case "WITH_QUERY":
      return (
        <EventsPageFiltered
          timeFilterOptions={timeFilterOptions}
          causesFilterOptions={causesFilterOptions}
        />
      );
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
  const timeFilterOptions: Dropdown[] = [
    { text: "Today", value: "TODAY" },
    { text: "Tomorrow", value: "TOMORROW" },
    { text: "This Week", value: "WEEK" },
    { text: "This Weekend", value: "WEEKEND" },
    { text: "Next Week", value: "NWEEK" },
    { text: "Next Weekend", value: "NWEEKEND" }
  ];

  const commonProps = {
    timeFilterOptions,
    causesFilterOptions: getCauses()
  };

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
    const query = returnQueryAsArray(context.query["cause"]);
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
