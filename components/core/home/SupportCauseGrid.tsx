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
  individual_container: {
    "min-width": 360
  },
  text: {
    "text-align": "center",
    color: "#333333",
    margin: "5px 0px"
  }
}));

const SupportCauseGrid = () => {
  const { width } = useWindowDimensions();
  const min = width ? width * 0.9 : 360 * 0.9;
  const split = min / 360 > 3 ? 3 : Math.max(1, Math.floor(min / 360));
  const grid_sm = 12 / split;
  const classes = useStyles();
  const data = [
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    },
    {
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png"
    }
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
          {data.map(elem => (
            <Grid
              item
              sm={grid_sm == 3 ? 3 : grid_sm == 2 ? 2 : 1}
              key={data.indexOf(elem)}
              className={classes.individual_container}
            >
              <Grid container justify="center" alignItems="center">
                <img
                  className="image"
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
