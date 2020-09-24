import React from "react";
import { useRouter } from "next/router";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import EventsPageLeftRailFilter from "./EventsPageLeftRailFilter";
import EventsPageTimeFilter from "./EventsPageTimeFilter";

import EventsPageLocationFilterAutocompleteInput from "./EventsPageLocationFilterAutocompleteInput";
import FocusVisibleOnly from "components/FocusVisibleOnly";

const useStyles = makeStyles({
  root: {
    padding: "32px 24px",
    width: "100%",
    backgroundColor: "#FFFFFF"
  },
  header: {
    // TODO: replace this with a Typography component
    fontFamily: "Visby CF, sans-serif",
    fontWeight: 800,
    fontSize: 24,
    lineHeight: "140%",
    color: "#333333"
  },
  topBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  clearFilterLabel: {
    fontFamily: "Visby CF, sans-serif",
    fontSize: 14,
    lineHeight: "130%",
    fontWeight: 800,
    color: "#FD8033",
    cursor: "pointer",
    textTransform: "uppercase"
  }
});

const EventsPageLeftRailComponent: React.FC<Record<string, unknown>> = () => {
  const { root, header, topBar, clearFilterLabel } = useStyles();
  const router = useRouter();

  // Sum up all the applied filters
  const filterCount = Object.values(router.query).reduce((acc, x) => {
    // x is string | string[] | undefined, so we need to account for each case
    if (x == null) {
      return acc;
    } else if (Array.isArray(x)) {
      return acc + x.length;
    }
    return acc + 1;
  }, 0);

  const clearFilters = async () => {
    await router.push({
      query: {}
    });
  };

  return (
    <div className={root}>
      <div className={topBar}>
        <Typography className={header}>Filters</Typography>
        {filterCount > 0 && (
          <FocusVisibleOnly onClick={() => clearFilters()}>
            <Typography className={clearFilterLabel}>
              Clear ({filterCount})
            </Typography>
          </FocusVisibleOnly>
        )}
      </div>
      <EventsPageLeftRailFilter
        header="Location"
        content={<EventsPageLocationFilterAutocompleteInput />}
      />
      <EventsPageLeftRailFilter
        header="Time"
        content={<EventsPageTimeFilter />}
        collapsible
      />
    </div>
  );
};

export default EventsPageLeftRailComponent;
