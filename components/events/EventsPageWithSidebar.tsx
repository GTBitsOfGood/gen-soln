import React from "react";

import EventsPageLayout from "components/events/EventsPageLayout";

import EventsPageSidebarComponent from "./sidebar/EventsPageSidebarComponent";

const EventsPageWithSidebar: React.FC = ({ children, ...rest }) => {
  return (
    <EventsPageLayout
      sidebarComponent={<EventsPageSidebarComponent {...rest} />}
    >
      {children}
    </EventsPageLayout>
  );
};

export default EventsPageWithSidebar;
