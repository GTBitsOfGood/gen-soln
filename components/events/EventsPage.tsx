import React from "react";
import EventsPageLayout from "components/events/EventsPageLayout";
import EventsPageLeftRailComponent from "./EventsPageLeftRailComponent";

import { Dropdown } from "utils/types";

interface Props {
  timeFilterOptions: Dropdown[];
  causesFilterOptions: Dropdown[];
}

const EventsPage: React.FC<Props> = props => {
  return (
    <EventsPageLayout
      sidebarComponent={
        <EventsPageLeftRailComponent
          timeFilterOptions={props.timeFilterOptions}
          causesFilterOptions={props.causesFilterOptions}
        />
      }
    >
      {null}
    </EventsPageLayout>
  );
};

export default EventsPage;
