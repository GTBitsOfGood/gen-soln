import React from "react";
import EventsPageWithSidebar from "./EventsPageWithSidebar";
import EventsPageMainContent from "./EventsPageMainContent";

import { DatePaginatedEventCards } from "utils/types";

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
