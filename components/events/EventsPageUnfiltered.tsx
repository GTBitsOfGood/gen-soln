import React from "react";
import EventsPageWithSidebar from "./EventsPageWithSidebar";
import EventsPageMainContent from "./EventsPageMainContent";

import { DatePaginatedEventCards } from "utils/types";

type Props = React.ComponentProps<typeof EventsPageWithSidebar> & {
  upcomingEventsFirstPageData: DatePaginatedEventCards;
};

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
