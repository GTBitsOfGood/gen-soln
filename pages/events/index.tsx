import React from "react";
import {
  NextPage,
  InferGetServerSidePropsType,
  GetServerSidePropsContext
} from "next";
import EventsPage from "components/events/EventsPage";
import { Dropdown } from "utils/types";
import { getCauses } from "server/actions/nonprofit";
import {
  getUpcomingEventsCardData,
  getUpcomingEventsCardDataCount
} from "server/actions/events";

const EventsNextPage: NextPage<InferGetServerSidePropsType<
  typeof getServerSideProps
>> = props => {
  return (
    <EventsPage
      timeFilterOptions={props.timeFilterOptions}
      causesFilterOptions={props.causesFilterOptions}
      upcomingEventsFirstPageData={props.upcomingEventsFirstPageData}
    />
  );
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

  let upcomingEventsFirstPageData = null;

  if (Object.keys(context.query).length === 0) {
    const date = new Date();
    const upcomingEventsTotalCount = await getUpcomingEventsCardDataCount(date);
    upcomingEventsFirstPageData = await getUpcomingEventsCardData({
      date: date.toJSON(),
      page: 0,
      totalCount: upcomingEventsTotalCount,
      isLastPage: false
    });
  }

  return {
    props: {
      timeFilterOptions,
      causesFilterOptions: getCauses(),
      upcomingEventsFirstPageData
    }
  };
};

export default EventsNextPage;
