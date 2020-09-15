import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

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
  subtitle: {
    // TODO: replace this with a Typography component
    fontFamily: "Visby CF, sans-serif",
    fontWeight: 800,
    fontSize: 16,
    lineHeight: "130%",
    color: "#333333"
  },
  subComponent: {
    marginTop: 16
  }
});

const EventsPageLeftRailComponent: React.FC<Record<string, unknown>> = () => {
  const { root, header, subtitle, subComponent } = useStyles();
  return (
    <div className={root}>
      <Typography className={header}>Filters</Typography>
      <div className={subComponent}>
        <Typography className={subtitle}>Location</Typography>
      </div>
    </div>
  );
};

export default EventsPageLeftRailComponent;
