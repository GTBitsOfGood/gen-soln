import React from "react";
import EventsPageLayout from "components/events/EventsPageLayout";
import EventsPageSidebarComponent from "./sidebar/EventsPageSidebarComponent";
import EventsPageMainContent from "./EventsPageMainContent";

import { DatePaginatedEventCards, Dropdown } from "utils/types";

interface Props {
  timeFilterOptions: Dropdown[];
  causesFilterOptions: Dropdown[];
  upcomingEventsFirstPageData: DatePaginatedEventCards | null;
}

const EventsPage: React.FC<Props> = props => {
  return (
    <EventsPageLayout
      sidebarComponent={
        <EventsPageSidebarComponent
          timeFilterOptions={props.timeFilterOptions}
          causesFilterOptions={props.causesFilterOptions}
        />
      }
    >
      {props.upcomingEventsFirstPageData && (
        <EventsPageMainContent
          upcomingEvents={props.upcomingEventsFirstPageData}
        />
      )}
    </EventsPageLayout>
  );
};

export default EventsPage;
