import React, { useState } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import FocusVisibleOnly from "components/FocusVisibleOnly";
import CoreTypography from "@core/typography";
import { ChevronDownIcon, ChevronUpIcon } from "@core/icons";

interface Props {
  header: string;
  collapsible?: boolean;
}

const useStyles = makeStyles({
  root: {
    marginTop: 16
  },
  collapseBar: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    "&:focusVisible": {
      outline: "none"
    }
  },
  contentContainer: {
    marginTop: 8
  }
});

const EventsPageFilterContainer: React.FC<Props> = ({
  header,
  children,
  collapsible = false
}) => {
  const { root, collapseBar, contentContainer } = useStyles();
  const [collapsed, setCollapsed] = useState(false);

  const headerJSX = <CoreTypography variant="h4">{header}</CoreTypography>;

  const topBar = collapsible ? (
    <FocusVisibleOnly onClick={() => setCollapsed(s => !s)}>
      <div className={collapseBar}>
        {headerJSX}
        {collapsed ? (
          <ChevronDownIcon fontSize="inherit" />
        ) : (
          <ChevronUpIcon fontSize="inherit" />
        )}
      </div>
    </FocusVisibleOnly>
  ) : (
    headerJSX
  );

  return (
    <div className={root}>
      {topBar}
      <div className={contentContainer}>{!collapsed && children}</div>
    </div>
  );
};

export default EventsPageFilterContainer;
