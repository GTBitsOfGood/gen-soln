import React from "react";

import { FilterPaginatedEventCards } from "utils/types";

import EventsPageFilteredContent from "./EventsPageFilteredContent";
import EventsPageWithSidebar from "./sidebar/EventsPageWithSidebar";

interface Props {
  filteredEventsFirstPageData: FilterPaginatedEventCards;
  filteredEventstotalCount: number;
}

const EventsPageFiltered: React.FC<Props> = ({
  filteredEventsFirstPageData,
  filteredEventstotalCount
}) => {
  return (
    <EventsPageWithSidebar>
      <EventsPageFilteredContent
        filteredEventsFirstPageData={filteredEventsFirstPageData}
        filteredEventstotalCount={filteredEventstotalCount}
      />
    </EventsPageWithSidebar>
  );
};

export default EventsPageFiltered;
