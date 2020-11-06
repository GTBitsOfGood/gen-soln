import React from "react";

import { makeStyles } from "@material-ui/core";

import CoreTypography from "@core/typography";

import { OptionValue } from ".";
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
  sort: OptionValue;
  setSort: (newSortValue: OptionValue) => void;
  setPosition: (position: Position) => void;
}

const EventsPageFilteredHeader: React.FC<Props> = ({
  resultsLength,
  sort,
  setSort,
  setPosition
}) => {
  const { header } = useStyles();

  return (
    <header className={header}>
      <CoreTypography variant="h2">{resultsLength} results</CoreTypography>
      <EventsPageFilteredHeaderSelect
        sort={sort}
        setSort={setSort}
        setPosition={setPosition}
      />
    </header>
  );
};

export default EventsPageFilteredHeader;
