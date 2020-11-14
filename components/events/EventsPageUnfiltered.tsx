import React, { useEffect } from "react";

import { DatePaginatedEventCards } from "utils/types";

import EventsPageMainContent from "./EventsPageMainContent";
import EventsPageWithSidebar from "./sidebar/EventsPageWithSidebar";
import { useRouterQueryParamsForSortingState } from "./useRouterQueryParamsState";

interface Props {
  upcomingEventsFirstPageData: DatePaginatedEventCards;
  allEventsFirstPageData: DatePaginatedEventCards;
}

const EventsPageUnfiltered: React.FC<Props> = ({
  upcomingEventsFirstPageData,
  allEventsFirstPageData
}) => {
  const { currentState, shallowClear } = useRouterQueryParamsForSortingState();

  // Ideally, the sortValue query parameter should be cleared by EventsPageFilteredHeaderSelect upon unmount, but that messes up route changes
  useEffect(() => {
    if (currentState != null) {
      shallowClear();
    }
  }, [currentState, shallowClear]);

  return (
    <EventsPageWithSidebar>
      <EventsPageMainContent
        upcomingEvents={upcomingEventsFirstPageData}
        allEvents={allEventsFirstPageData}
      />
    </EventsPageWithSidebar>
  );
};

export default EventsPageUnfiltered;
