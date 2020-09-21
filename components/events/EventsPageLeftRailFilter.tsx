import React, { useState } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import FocusVisibleOnly from "components/FocusVisibleOnly";

interface Props {
  header: string;
  collapsible?: boolean;
  content: React.ReactNode;
}

const useStyles = makeStyles({
  root: {
    marginTop: 16
  },
  subtitle: {
    // TODO: replace this with a Typography component
    fontFamily: "Visby CF, sans-serif",
    fontWeight: 800,
    fontSize: 16,
    lineHeight: "130%",
    color: "#333333"
  },
  collapseBar: {
    display: "flex",
    justifyContent: "space-between",
    cursor: "pointer",
    "&:focusVisible": {
      outline: "none"
    }
  }
});

const EventsPageLeftRailFilter: React.FC<Props> = ({
  header,
  collapsible = false,
  content
}: Props) => {
  const { root, subtitle, collapseBar } = useStyles();
  const [collapsed, setCollapsed] = useState(false);

  const topBar = collapsible ? (
    <FocusVisibleOnly onClick={() => setCollapsed(!collapsed)}>
      <div className={collapseBar}>
        <Typography className={subtitle}>{header}</Typography>
        {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
      </div>
    </FocusVisibleOnly>
  ) : (
    <Typography className={subtitle}>{header}</Typography>
  );

  return (
    <div className={root}>
      {topBar}
      {!collapsed && content}
    </div>
  );
};

export default EventsPageLeftRailFilter;
