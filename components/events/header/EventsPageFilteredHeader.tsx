import React from "react";

import { makeStyles } from "@material-ui/core";

import CoreTypography from "@core/typography";

import EventsPageFilteredHeaderSelect from "./EventsPageFilteredHeaderSelect";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20
  }
});

interface Props {
  resultsLength: number;
}

const EventsPageFilteredHeader: React.FC<Props> = ({ resultsLength }) => {
  const { header } = useStyles();

  return (
    <header className={header}>
      <CoreTypography variant="h2">{resultsLength} results</CoreTypography>
      <EventsPageFilteredHeaderSelect />
    </header>
  );
};

export default EventsPageFilteredHeader;
