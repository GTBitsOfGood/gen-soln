import React from "react";

import { makeStyles } from "@material-ui/core";

import CoreTypography from "@core/typography";
import { Dropdown } from "utils/types";

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

const SORT_OPTIONS: Dropdown[] = [
  { text: "Closest to you", value: "location" },
  { text: "Most signed up", value: "participants" }
];

const EventsPageFilteredHeader: React.FC<Props> = ({ resultsLength }) => {
  const { header } = useStyles();

  return (
    <header className={header}>
      <CoreTypography variant="h2">{resultsLength} results</CoreTypography>
      <EventsPageFilteredHeaderSelect
        items={SORT_OPTIONS}
        selectedValue={SORT_OPTIONS[1].value}
      />
    </header>
  );
};

export default EventsPageFilteredHeader;
