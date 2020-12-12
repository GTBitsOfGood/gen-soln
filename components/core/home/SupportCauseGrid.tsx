import React from "react";

import { Grid, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import CoreTypography from "@core/typography";
import useWindowDimensions from "@core/util/findWindowSize";

import { filters } from "../../../utils/filters";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  container: {
    display: "flex",
    flexDirection: "column",
    "align-self": "center",
    "margin-top": "10vh",
    "margin-left": "5vh",
    "margin-right": "5vh"
  },
  individual_container: minGridWidth => ({
    "min-width": minGridWidth.toString() + "%"
  }),
  heading: {
    "text-align": "center",
    color: "#333333",
    margin: "5px 0px"
  },
  causeText: {
    color: theme.palette.primary.contrastText,
    align_self: "center",
    maxWidth: 260
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    width: 360,
    height: 202,
    borderRadius: 10,
    overflow: "hidden",
    outline: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundPosition: "center",
    backgroundSize: "cover"
  }
}));

const SupportCauseGrid = () => {
  const { width } = useWindowDimensions();
  const min = width ? width * 0.9 : 360 * 0.9;
  const split = min / 360 > 3 ? 3 : Math.max(1, Math.floor(min / 360));
  const minGridWidth = 100 / split;
  const grid_sm = 12 / split;
  const classes = useStyles(minGridWidth);
  const causes = filters["cause"].map(({ text, value }) => {
    return {
      cause: text,
      imagePath: `../../.././causes/${value}.jpg`
    };
  });
  return (
    <div className={classes.container}>
      <Typography className={classes.heading} variant="h1">
        Find a Cause You Support
      </Typography>
      <div className={classes.root}>
        <Grid
          container
          spacing={2}
          justify="center"
          alignItems="center"
          style={{ minHeight: "100vh", maxWidth: "100%" }}
        >
          {causes.map(elem => (
            <Grid
              item
              sm={grid_sm == 3 ? 3 : grid_sm == 2 ? 2 : 1}
              key={causes.indexOf(elem)}
              className={classes.individual_container}
            >
              <Grid container justify="center" alignItems="center">
                <div
                  className={classes.card}
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${elem.imagePath})`
                  }}
                >
                  <CoreTypography variant="h2" className={classes.causeText}>
                    {elem.cause}
                  </CoreTypography>
                </div>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default SupportCauseGrid;
