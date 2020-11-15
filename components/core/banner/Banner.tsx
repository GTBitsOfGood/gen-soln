import React from "react";

import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

import { CoreButton } from "@core/buttons";
import { SearchIcon } from "@core/icons";
import CoreTypography from "@core/typography/CoreTypography";

const useStyles = makeStyles({
  banner: {
    display: "flex",
    justifyContent: "center",
    margin: 0,
    alignItems: "center",
    overflow: "hidden",
    position: "absolute",
    transform: "translate(10%, -400px)",
    marginRight: "10%"
  },
  overlay: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -700
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    textAlign: "left"
  },
  box: {
    padding: "50px",
    position: "relative",
    textAlign: "center",
    width: 906,
    height: 184,
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 20,
    marginTop: -850
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
  },
  bgimg: {
    objectFit: "cover",
    filter: "brightness(50%)",
    height: 530,
    width: "100vw"
  }
});

export default function SimpleContainer() {
  const classes = useStyles();
  return (
    <div>
      <div>
        <img
          className={classes.bgimg}
          src="../backgrounds/HeroImg.jpg"
          alt="Background"
        ></img>
        <div className={classes.banner}>
          <Container>
            <CoreTypography variant="h1" style={{ color: "white" }}>
              Connecting Non-profits with Communities <br></br> of People Who to
              to do Good
            </CoreTypography>
            <br></br>
            <CoreTypography variant="h3" style={{ color: "white" }}>
              Free for Non-profits, no subscription or platform fees
            </CoreTypography>
            <br></br>
            <CoreButton variant="contained"> Non-profit sign up </CoreButton>
          </Container>
        </div>
      </div>
      <div className={classes.overlay}>
        <div className={classes.box}>
          <CoreTypography variant="h2">
            Discover Non-Profts Near You
          </CoreTypography>
          <br></br>
          <div className={classes.row}>
            <div>
              <CoreTypography variant="h4">Location</CoreTypography>
              <CoreTypography variant="body2" style={{ color: "gray" }}>
                Where are you located?
              </CoreTypography>
            </div>
            <div>
              <CoreTypography variant="h4">Cause</CoreTypography>
              <CoreTypography variant="body2" style={{ color: "gray" }}>
                What are you interested in?
              </CoreTypography>
            </div>
            <div>
              <CoreTypography variant="h4">Contribute</CoreTypography>
              <CoreTypography variant="body2" style={{ color: "gray" }}>
                How do you want to help?
              </CoreTypography>
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
