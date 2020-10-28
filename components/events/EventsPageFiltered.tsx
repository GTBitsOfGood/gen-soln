import React from "react";

import { FilterPaginatedEventCards } from "utils/types";

import EventsPageFilteredContent from "./EventsPageFilteredContent";
import EventsPageWithSidebar from "./sidebar/EventsPageWithSidebar";

interface Props extends React.ComponentProps<typeof EventsPageWithSidebar> {
  filteredEventsFirstPageData: FilterPaginatedEventCards;
}

const EventsPageFiltered: React.FC<Props> = ({
  filteredEventsFirstPageData,
  ...rest
}) => {
  return (
    <EventsPageWithSidebar {...rest}>
      <EventsPageFilteredContent filteredEvents={filteredEventsFirstPageData} />
    </EventsPageWithSidebar>
  );
};

export default EventsPageFiltered;
