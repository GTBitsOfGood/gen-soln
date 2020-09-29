import React from "react";
import EventsPageLayout from "components/events/EventsPageLayout";
import EventsPageLeftRailComponent from "./EventsPageLeftRailComponent";
import EventsList from "./EventsList";

import { Dropdown } from "utils/types";

interface Props {
  causesFilterOptions: Dropdown[];
}

const EventsPage: React.FC<Props> = props => {
  return (
    <EventsPageLayout
      sidebarComponent={
        <EventsPageLeftRailComponent
          causesFilterOptions={props.causesFilterOptions}
        />
      }
    >
        <div style={{ padding: 64, width: "100%" }}>
          <EventsList />
        </div>
    </EventsPageLayout>
  );
};

export default EventsPage;
