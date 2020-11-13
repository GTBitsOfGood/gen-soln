import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { useRouter } from "next/router";

import { CoreButton } from "@core/buttons";
import CoreTypography from "@core/typography";
import { getFilterCountFromQuery } from "utils/filters";

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
  const filterCount = getFilterCountFromQuery(router.query);

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
