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
  getFilteredEventsCardData,
  getFilteredEventsCardDataCount
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
      return (
        <EventsPageFiltered
          filteredEventsFirstPageData={props.filteredEventsFirstPageData}
          filteredEventstotalCount={props.filteredEventstotalCount}
        />
      );
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
  const date = new Date().toJSON();

  if (getFilterCountFromQuery(query) === 0) {
    const upcomingEventsFirstPageData = await getUpcomingEventsCardData({
      date,
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
    let filteredEventsFirstPageData, filteredEventstotalCount;

    const sortValue = getSortValueInQuery(query) ?? DEFAULT_SORT_VALUE;
    const causes = getFilterValuesInQuery(query, "cause");
    const cities = getFilterValuesInQuery(query, "location");
    const times = getFilterValuesInQuery(query, "time");

    const totalCountPromise = getFilteredEventsCardDataCount({
      causes,
      cities,
      times,
      date
    });

    switch (sortValue) {
      case "participants": {
        [
          filteredEventsFirstPageData,
          filteredEventstotalCount
        ] = await Promise.all([
          getFilteredEventsCardData({
            causes,
            cities,
            times,
            page: 0,
            lat: -999,
            long: -999,
            date,
            sortValue
          }),
          totalCountPromise
        ]);
        break;
      }
      case "location":
        filteredEventstotalCount = await totalCountPromise;
        break;
      default: {
        const _exhaustiveCheck: never = sortValue;
        return _exhaustiveCheck;
      }
    }

    return {
      props: {
        ...commonProps,
        filteredEventsFirstPageData,
        filteredEventstotalCount,
        type: "WITH_QUERY" as const
      }
    };
  }
};

export default EventsNextPage;
