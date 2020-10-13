import React from "react";

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  CardActionArea
} from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  media: {
    height: 140,
    maxWidth: 345
  },
  container: {
    display: "flex",
    "min-width": "420px",
    flexDirection: "column",
    "align-self": "center",
    "margin-top": "10vh"
  },
  text: {
    "text-align": "center",
    color: "#333333",
    margin: "5px 0px"
  }
}));

export default function MediaCard() {
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
          spacing={3}
          direction="row"
          justify="flex-start"
          alignItems="flex-start"
        >
          {data.map(elem => (
            <Grid item md={4} key={data.indexOf(elem)}>
              <img
                src={`${elem.image}`}
                alt="Placeholder"
                height="200"
                width="300"
              />
              {/*
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    height="200"
                    image={`${elem.image}`}
                  />
                  <CardContent></CardContent>
                </CardActionArea>
              </Card>
              */}
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
/*
const SupportCauseGrid = () => {
  return null;
};

export default SupportCauseGrid;
*/
