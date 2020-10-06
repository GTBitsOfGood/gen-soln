import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import EventsPageSidebarComponentHeader from "./EventsPageSidebarComponentHeader";
import EventsPageFilterContainer from "./EventsPageFilterContainer";
import EventsPageDropdownFilter from "./EventsPageDropdownFilter";
import EventsPageLocationFilter from "./EventsPageLocationFilter";

import { Dropdown } from "utils/types";

const useStyles = makeStyles({
  root: {
    padding: "32px 24px",
    width: "100%",
    backgroundColor: "#FFFFFF"
  }
});

interface Props {
  timeFilterOptions: Dropdown[];
  causesFilterOptions: Dropdown[];
}

const EventsPageSidebarComponent: React.FC<Props> = ({
  timeFilterOptions,
  causesFilterOptions
}) => {
  const { root } = useStyles();

  return (
    <div className={root}>
      <EventsPageSidebarComponentHeader />
      <EventsPageFilterContainer header="Location">
        <EventsPageLocationFilter />
      </EventsPageFilterContainer>
      <EventsPageFilterContainer header="Time" collapsible>
        <EventsPageDropdownFilter
          filter="time"
          filterOptions={timeFilterOptions}
        />
      </EventsPageFilterContainer>
      <EventsPageFilterContainer header="Causes" collapsible>
        <EventsPageDropdownFilter
          filter="cause"
          filterOptions={causesFilterOptions}
        />
      </EventsPageFilterContainer>
    </div>
  );
};

export default EventsPageSidebarComponent;
