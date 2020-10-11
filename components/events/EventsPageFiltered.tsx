import React from "react";

import EventsPageWithSidebar from "./EventsPageWithSidebar";

// Right now we have no additional props
type Props = React.ComponentProps<typeof EventsPageWithSidebar>;

const EventsPageFiltered: React.FC<Props> = props => {
  return <EventsPageWithSidebar {...props} />;
};

export default EventsPageFiltered;
