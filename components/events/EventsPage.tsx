import React from "react";
import EventsPageLayout from "components/events/EventsPageLayout";
import EventsPageLeftRailComponent from "./EventsPageLeftRailComponent";
import EventsPageMainContent from "./EventsPageMainContent";

import { DatePaginatedEventCards, Dropdown } from "utils/types";

interface Props {
  timeFilterOptions: Dropdown[];
  causesFilterOptions: Dropdown[];
  upcomingEventsFirstPageData: DatePaginatedEventCards | undefined;
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
      <EventsPageMainContent
        upcomingEvents={props.upcomingEventsFirstPageData!}
      />
    </EventsPageLayout>
  );
};

export default EventsPage;
