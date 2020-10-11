import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { causesFilter, timesFilter } from "utils/filters";

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

const EventsPageSidebarComponent: React.FC = () => {
  const { root } = useStyles();

  return (
    <div className={root}>
      <EventsPageSidebarComponentHeader />
      <EventsPageFilterContainer header="Location">
        <EventsPageLocationFilter />
      </EventsPageFilterContainer>
      <EventsPageFilterContainer header="Time" collapsible>
        <EventsPageDropdownFilter filter={timesFilter} />
      </EventsPageFilterContainer>
      <EventsPageFilterContainer header="Causes" collapsible>
        <EventsPageDropdownFilter filter={causesFilter} />
      </EventsPageFilterContainer>
    </div>
  );
};

export default EventsPageSidebarComponent;
