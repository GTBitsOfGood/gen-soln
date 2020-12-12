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
  getFilteredEventsCardDataCount,
  getAllEventsCardData
} from "server/actions/events";
import { getFilterValuesInQuery, getFilterCountFromQuery } from "utils/filters";
import { DEFAULT_SORT_VALUE, getSortValueInQuery } from "utils/sortOptions";
import { FilterPaginatedEventCards } from "utils/types";

const EventsNextPage: NextPage<InferGetServerSidePropsType<
  typeof getServerSideProps
>> = props => {
  switch (props.type) {
    case "WITHOUT_QUERY":
      return (
        <EventsPageUnfiltered
          upcomingEventsFirstPageData={props.upcomingEventsFirstPageData}
          allEventsFirstPageData={props.allEventsFirstPageData}
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
    const [
      upcomingEventsFirstPageData,
      allEventsFirstPageData
    ] = await Promise.all([
      getUpcomingEventsCardData({
        date,
        page: 0
      }),
      await getAllEventsCardData({
        date,
        page: 0
      })
    ]);

    return {
      props: {
        ...commonProps,
        upcomingEventsFirstPageData,
        allEventsFirstPageData,
        type: "WITHOUT_QUERY" as const
      }
    };
  } else {
    let filteredEventsFirstPageData: FilterPaginatedEventCards,
      filteredEventstotalCount;

    const filterValues = {
      causes: getFilterValuesInQuery(query, "cause"),
      cities: getFilterValuesInQuery(query, "location"),
      times: getFilterValuesInQuery(query, "time"),
      date
    };
    const totalCountPromise = getFilteredEventsCardDataCount(filterValues);

    const sortValue = getSortValueInQuery(query) ?? DEFAULT_SORT_VALUE;
    const initialRequestData = {
      sortValue,
      page: 0,
      lat: -999, // Any number, doesn't matter. We don't call getFilteredEventsCardData() when sortValue="location" on the server.
      long: -999
    };

    switch (sortValue) {
      case "participants": {
        [
          filteredEventsFirstPageData,
          filteredEventstotalCount
        ] = await Promise.all([
          getFilteredEventsCardData({
            ...filterValues,
            ...initialRequestData
          }),
          totalCountPromise
        ]);
        break;
      }
      case "location":
        filteredEventstotalCount = await totalCountPromise;
        filteredEventsFirstPageData = {
          ...filterValues,
          ...initialRequestData,
          cards: [], // the server doesn't know what cards are part of the first page when sorting by "location".
          isLastPage: false // so that EventsPageInfiniteScroll can show glimmers while client is fetching data.
        };
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
