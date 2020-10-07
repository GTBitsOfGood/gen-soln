import React, { useState } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import FocusVisibleOnly from "components/FocusVisibleOnly";

import CoreTypography from "@core/typography";

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
        {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
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
