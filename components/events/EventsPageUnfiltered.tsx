import React from "react";

import { DatePaginatedEventCards } from "utils/types";

import EventsPageMainContent from "./EventsPageMainContent";
import EventsPageWithSidebar from "./EventsPageWithSidebar";

interface Props extends React.ComponentProps<typeof EventsPageWithSidebar> {
  upcomingEventsFirstPageData: DatePaginatedEventCards;
}

const EventsPageUnfiltered: React.FC<Props> = ({
  upcomingEventsFirstPageData,
  ...rest
}) => {
  return (
    <EventsPageWithSidebar {...rest}>
      <EventsPageMainContent upcomingEvents={upcomingEventsFirstPageData} />
    </EventsPageWithSidebar>
  );
};

export default EventsPageUnfiltered;
