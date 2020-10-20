import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { CoreButton } from "@core/buttons";
import { SearchIcon } from "@core/icons";

const useStyles = makeStyles({
  banner: {
    display: "flex",
    justifyContent: "center",
    margin: 0,
    backgroundImage: "url(" + "../backgrounds/HeroImg.jpg" + ")",
    height: "530px",
    alignItems: "center"
  },
  overlay: {
    display: "flex",
    width: "906px",
    height: "184px",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-130px",
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: "20px"
  },
  smallContainer: {
    justifyContent: "space-evenly"
  },
  c: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  sc: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  box: {
    padding: "50px",
    position: "relative",
    textAlign: "center",
    width: "906px",
    height: "184px",
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: "20px",
    marginTop: "-850px"
  },
  searchIcon: {
    paddingLeft: 17,
    paddingRight: 17,
    paddingTop: 0,
    color: "white",
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 14
  }
});

export default function SimpleContainer() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.banner}>
        <Container>
          <Typography variant="h1" style={{ color: "white" }}>
            Connecting Non-profits with Communities <br></br> of People Who Want
            to do Good
          </Typography>
          <br></br>
          <Typography variant="h3" style={{ color: "white" }}>
            Free for Non-profits, no subscription or platform fees
          </Typography>
          <br></br>
          <CoreButton variant="contained"> Non-profit sign up </CoreButton>
        </Container>
      </div>
      <div className={classes.c}>
        <div className={classes.box}>
          <Typography variant="h2">Discover Non-Profts Near You</Typography>
          <br></br>
          <div className={classes.sc}>
            <div style={{ textAlign: "left" }}>
              <Typography variant="h4">Location</Typography>
              <Typography variant="body2" style={{ color: "gray" }}>
                Where are you located?
              </Typography>
            </div>
            <div style={{ textAlign: "left" }}>
              <Typography variant="h4">Cause</Typography>
              <Typography variant="body2" style={{ color: "gray" }}>
                What are you interested in?
              </Typography>
            </div>
            <div style={{ textAlign: "left" }}>
              <Typography variant="h4">Contribute</Typography>
              <Typography variant="body2" style={{ color: "gray" }}>
                How do you want to help?
              </Typography>
            </div>
          </div>
          <br></br>
          <CoreButton variant="contained">
            <div className={classes.searchIcon}>
              <SearchIcon /> Search
            </div>
          </CoreButton>
        </div>
      </div>
    </div>
  );
}
