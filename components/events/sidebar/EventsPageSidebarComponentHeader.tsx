import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { useRouter } from "next/router";

import { CoreButton } from "@core/buttons";
import CoreTypography from "@core/typography";

const useStyles = makeStyles({
  topBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    minHeight: "2.4rem" // a large enough minHeight to avoid jerky changes to the UI when the clear button suddenly appears
  }
});

const EventsPageSidebarComponentHeader: React.FC = () => {
  const { topBar } = useStyles();
  const router = useRouter();

  // Sum up all the applied filters
  // TODO: only sum up filters that we support (time, location, cause)
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
    <div className={topBar}>
      <CoreTypography variant="h2">Filters</CoreTypography>
      {filterCount > 0 && (
        <CoreButton onClick={clearFilters}>Clear ({filterCount})</CoreButton>
      )}
    </div>
  );
};

export default EventsPageSidebarComponentHeader;
