import React from "react";

import EventsPageLayout from "components/events/EventsPageLayout";

import EventsPageSidebarComponent from "./EventsPageSidebarComponent";

const EventsPageWithSidebar: React.FC = ({ children }) => {
  return (
    <EventsPageLayout sidebarComponent={<EventsPageSidebarComponent />}>
      {children}
    </EventsPageLayout>
  );
};

export default EventsPageWithSidebar;
