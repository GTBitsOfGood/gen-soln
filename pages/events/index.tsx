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
  getFilteredEventsCardData
} from "server/actions/events";
import { getFilterValuesInQuery, getFilterCountFromQuery } from "utils/filters";
import { DEFAULT_SORT_VALUE, getSortValueInQuery } from "utils/sortOptions";

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

export const getServerSideProps = async ({
  query
}: GetServerSidePropsContext) => {
  // Don't remove the async otherwise InferGetStaticPropsType won't work as expected
  // TODO: Use this eventually, if we need common props between filtered and unfiltered event pages.
  const commonProps = {};

  if (getFilterCountFromQuery(query) === 0) {
    const date = new Date();
    const upcomingEventsFirstPageData = await getUpcomingEventsCardData({
      date: date.toJSON(),
      page: 0
    });

    return {
      props: {
        ...commonProps,
        upcomingEventsFirstPageData,
        type: "WITHOUT_QUERY" as const
      }
    };
  } else {
    const sortBy = getSortValueInQuery(query) ?? DEFAULT_SORT_VALUE;
    switch (sortBy) {
      case "participants": {
        const causes = getFilterValuesInQuery(query, "cause");
        const cities = getFilterValuesInQuery(query, "location");
        const times = getFilterValuesInQuery(query, "time");
        /*upcomingEventsFirstPageData =  await getByFilteredEventsCardData({
          causes,
          cities,
          times,
          // TO DO: ADD PAGE SUPPORT
        });*/
        break; // TODO: Call getByFilteredEventsCardData and return first page of data
      }
      case "location":
        // TODO: DO NOT call getByFilteredEventsCardData, since the first page data corresponding to location
        // cannot be determined on the server. The client should make the request to get the first page's data.
        break;
      default: {
        const _exhaustiveCheck: never = sortBy;
        return _exhaustiveCheck;
      }
    }
  }

  return {
    props: {
      ...commonProps,
      type: "WITH_QUERY" as const
    }
  };
};

export default EventsNextPage;
