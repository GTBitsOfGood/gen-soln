import React from "react";
import EventsPageLayout from "components/events/EventsPageLayout";
import EventsPageSidebarComponent from "./sidebar/EventsPageSidebarComponent";

import { Dropdown } from "utils/types";

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
