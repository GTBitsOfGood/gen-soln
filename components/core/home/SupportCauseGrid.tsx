import React from "react";

import { Grid, Typography } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  container: {
    display: "flex",
    "min-width": "420px",
    flexDirection: "column",
    "align-self": "center",
    "margin-top": "10vh",
    "margin-left": "5vh",
    "margin-right": "5vh"
  },
  text: {
    "text-align": "center",
    color: "#333333",
    margin: "5px 0px"
  }
}));

const SupportCauseGrid = () => {
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
            <Grid item sm={4} key={data.indexOf(elem)}>
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
