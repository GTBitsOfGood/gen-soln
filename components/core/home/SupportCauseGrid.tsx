import React from "react";

import { Grid, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

import useWindowDimensions from "@core/util/findWindowSize";

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
  text: {
    "text-align": "center",
    color: "#333333",
    margin: "5px 0px"
  },
  image: {
    "border-radius": "10px"
  }
}));

const SupportCauseGrid = () => {
  const { width } = useWindowDimensions();
  const min = width ? width * 0.9 : 360 * 0.9;
  const split = min / 360 > 3 ? 3 : Math.max(1, Math.floor(min / 360));
  const minGridWidth = 100 / split;
  const grid_sm = 12 / split;
  const classes = useStyles(minGridWidth);
  const images = [
    { image: "../../.././causes/ARTS_CULTURE_AND_HUMANITIES.jpg" },
    { image: "../.././causes/EDUCATION_AND_RESEARCH.jpg" },
    { image: "../.././causes/ENVIRONMENT_AND_ANIMALS.jpg" },
    { image: "../.././causes/HEALTH.jpg" },
    { image: "../.././causes/HUMAN_SERVICES.jpg" },
    { image: "../.././causes/INTERNATIONAL.jpg" },
    { image: "../.././causes/PUBLIC_SOCIETAL.jpg" },
    { image: "../.././causes/RELIGION.jpg" },
    { image: "../.././causes/OTHER.jpg" }
  ];
  return (
    <div className={classes.container}>
      <Typography className={classes.text} variant="h4">
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
          {images.map(elem => (
            <Grid
              item
              sm={grid_sm == 3 ? 3 : grid_sm == 2 ? 2 : 1}
              key={images.indexOf(elem)}
              className={classes.individual_container}
            >
              <Grid container justify="center" alignItems="center">
                <img
                  className={classes.image}
                  src={`${elem.image}`}
                  alt="Placeholder"
                  height="202"
                  width="360"
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default SupportCauseGrid;
