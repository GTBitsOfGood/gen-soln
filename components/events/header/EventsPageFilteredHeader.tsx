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
  setPosition: (position: Position) => void;
}

const EventsPageFilteredHeader: React.FC<Props> = ({
  resultsLength,
  setPosition
}) => {
  const { header } = useStyles();

  return (
    <header className={header}>
      <CoreTypography variant="h2">{resultsLength} results</CoreTypography>
      <EventsPageFilteredHeaderSelect setPosition={setPosition} />
    </header>
  );
};

export default EventsPageFilteredHeader;
