import React from "react";

import EventsPageFilteredContent from "./EventsPageFilteredContent";
import EventsPageWithSidebar from "./EventsPageWithSidebar";

type Props = React.ComponentProps<typeof EventsPageWithSidebar>;

const EventsPageFiltered: React.FC<Props> = props => {
  return (
    <EventsPageWithSidebar {...props}>
      <EventsPageFilteredContent />
    </EventsPageWithSidebar>
  );
};

export default EventsPageFiltered;
