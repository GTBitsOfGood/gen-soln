import React from "react";
import EventsPageLayout from "components/events/EventsPageLayout";
import EventsPageLeftRailComponent from "./EventsPageLeftRailComponent";

const EventsPage: React.FC = () => {
  return (
    <EventsPageLayout sidebarComponent={<EventsPageLeftRailComponent />}>
      {null}
    </EventsPageLayout>
  );
};

export default EventsPage;
