import React from "react";

import EventsPageLayout from "components/events/EventsPageLayout";
import { Dropdown } from "utils/types";

import EventsPageSidebarComponent from "./sidebar/EventsPageSidebarComponent";

interface Props {
  timeFilterOptions: Dropdown[];
  causesFilterOptions: Dropdown[];
}

const EventsPageWithSidebar: React.FC<Props> = ({
  timeFilterOptions,
  causesFilterOptions,
  children
}) => {
  return (
    <EventsPageLayout
      sidebarComponent={
        <EventsPageSidebarComponent
          timeFilterOptions={timeFilterOptions}
          causesFilterOptions={causesFilterOptions}
        />
      }
    >
      {children}
    </EventsPageLayout>
  );
};

export default EventsPageWithSidebar;
