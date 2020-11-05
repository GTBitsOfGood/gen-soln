import React from "react";

import { DatePaginatedEventCards } from "utils/types";

import EventsPageMainContent from "./EventsPageMainContent";
import EventsPageWithSidebar from "./sidebar/EventsPageWithSidebar";

interface Props {
  upcomingEventsFirstPageData: DatePaginatedEventCards;
}

const EventsPageUnfiltered: React.FC<Props> = ({
  upcomingEventsFirstPageData
}) => {
  return (
    <EventsPageWithSidebar>
      <EventsPageMainContent upcomingEvents={upcomingEventsFirstPageData} />
    </EventsPageWithSidebar>
  );
};

export default EventsPageUnfiltered;
