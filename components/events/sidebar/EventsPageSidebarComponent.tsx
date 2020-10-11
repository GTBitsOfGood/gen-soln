import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { Dropdown } from "utils/types";

import EventsPageDropdownFilter from "./EventsPageDropdownFilter";
import EventsPageFilterContainer from "./EventsPageFilterContainer";
import EventsPageLocationFilter from "./EventsPageLocationFilter";
import EventsPageSidebarComponentHeader from "./EventsPageSidebarComponentHeader";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    root: {
      padding: "calc(8% + 8px) 8%",
      width: "100%",
      backgroundColor: palette.background.paper
    }
  })
);

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
