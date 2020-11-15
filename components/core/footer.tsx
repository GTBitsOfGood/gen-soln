import React from "react";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

/*
import footerImage1 from "../../public/site/bog-footer.png";
import * as logo from "../../public/site/bog-logo.png";
import logo2 from "../../public/site/bog-logo2.png";
*/

import CoreButton from "./buttons/CoreButton";
import CoreTypography from "./typography/CoreTypography";

export default function FixedContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container style={{ height: "558px" }}>
        <Typography component="div" style={{ backgroundColor: "#cfe8fc" }} />
        <div style={{ marginLeft: "40px", marginTop: "96px", float: "left" }}>
          <img
            src="../backgrounds/support_us.png"
            alt="bits of good footer"
            width="587"
            height="366"
          />
        </div>
        <div
          style={{ float: "left", marginLeft: "117px", marginTop: "118.5px" }}
        >
          <CoreTypography variant="h4">Built by Students</CoreTypography>
          <div style={{ width: "438px", marginTop: "16px", color: "#999999" }}>
            <CoreTypography variant="h5">
              This platform is maintained by a community of student volunteers.
              In order to continue operating, we rely on the support of our
              non-profit partners and sponsors.
            </CoreTypography>
          </div>

          <CoreButton
            variant="contained"
            style={{
              backgroundColor: "#FD8033",
              color: "white",
              height: "45px",
              width: "133px",
              marginTop: "36px"
            }}
          >
            Support Us
          </CoreButton>
        </div>
      </Container>
      <Divider />
      <Container style={{ height: "337px" }}>
        <Container
          style={{ height: "104px", width: "906px", paddingTop: "96px" }}
        >
          <CoreTypography variant="h4" style={{ textAlign: "center" }}>
            Let’s Change the World, One Bit at a Time
          </CoreTypography>
          <CoreTypography
            variant="body1"
            style={{
              textAlign: "center",
              color: "#999999",
              fontSize: "24px",
              marginTop: "16px"
            }}
          >
            Select a non-profit today
          </CoreTypography>
        </Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <CoreButton
            variant="contained"
            style={{
              backgroundColor: "#FD8033",
              color: "white",
              height: "45px",
              width: "203px",
              marginTop: "140px"
            }}
          >
            Donate
          </CoreButton>

          <CoreButton
            variant="contained"
            style={{
              backgroundColor: "#FD8033",
              color: "white",
              height: "45px",
              width: "203px",
              marginTop: "140px",
              marginLeft: "96px"
            }}
          >
            Volunteer
          </CoreButton>
        </div>
      </Container>
      <Divider />
      <Container style={{ height: "445px" }}>
        <div style={{ marginTop: "72px", marginLeft: "50px", float: "left" }}>
          {/*
          <img src={logo} alt="bits of good logo" height="24px" width="133px" /> */}
          <div style={{ marginTop: "10px", color: "#333333" }}>
            <CoreTypography variant="body2">@ 2020 Bits of Good</CoreTypography>
          </div>
        </div>
        <div style={{ marginLeft: "219px", marginTop: "72px", float: "left" }}>
          <CoreTypography variant="overline">
            <strong>ORGANIZATION</strong>
          </CoreTypography>
          <ul style={{ paddingLeft: "0px", listStyle: "none" }}>
            <li>
              <CoreTypography variant="caption">About Us</CoreTypography>
            </li>
            <li style={{ marginTop: "16px" }}>
              <CoreTypography variant="caption">Our Partners</CoreTypography>
            </li>
            <li style={{ marginTop: "16px" }}>
              <CoreTypography variant="caption">Our Sponsors</CoreTypography>
            </li>
            <li style={{ marginTop: "16px" }}>
              <CoreTypography variant="caption">Contact Us</CoreTypography>
            </li>
          </ul>
        </div>
        <div style={{ marginLeft: "121px", marginTop: "72px", float: "left" }}>
          <CoreTypography variant="overline">
            <strong>CONTRIBUTE</strong>
          </CoreTypography>
          <ul style={{ paddingLeft: "0px", listStyle: "none" }}>
            <li>
              <CoreTypography variant="caption">Sponsorship</CoreTypography>
            </li>
            <li style={{ marginTop: "16px" }}>
              <CoreTypography variant="caption">Partnership</CoreTypography>
            </li>
            <li style={{ marginTop: "16px" }}>
              <CoreTypography variant="caption">Donate</CoreTypography>
            </li>
            <li style={{ marginTop: "16px" }}>
              <CoreTypography variant="caption">Open Roles</CoreTypography>
            </li>
          </ul>
        </div>
        <div style={{ marginLeft: "143px", marginTop: "72px", float: "left" }}>
          <CoreTypography variant="overline">
            <strong>SUPPORT</strong>
          </CoreTypography>
          <ul style={{ paddingLeft: "0px", listStyle: "none" }}>
            <li>
              <CoreTypography variant="caption">Get Help</CoreTypography>
            </li>
            <li style={{ marginTop: "16px" }}>
              <CoreTypography variant="caption">Guides</CoreTypography>
            </li>
            <li style={{ marginTop: "16px" }}>
              <CoreTypography variant="caption">Give Feedback</CoreTypography>
            </li>
          </ul>
        </div>
        <div style={{ marginLeft: "166px", marginTop: "72px", float: "left" }}>
          <CoreTypography variant="overline">
            <strong>SOCIAL</strong>
          </CoreTypography>
          <ul style={{ paddingLeft: "0px", listStyle: "none" }}>
            <li>
              <CoreTypography variant="caption">Facebook</CoreTypography>
            </li>
            <li style={{ marginTop: "16px" }}>
              <CoreTypography variant="caption">Instagram</CoreTypography>
            </li>
            <li style={{ marginTop: "16px" }}>
              <CoreTypography variant="caption">Medium</CoreTypography>
            </li>
            <li style={{ marginTop: "16px" }}>
              <CoreTypography variant="caption">Github</CoreTypography>
            </li>
          </ul>
        </div>
      </Container>
      <br></br>
      <br></br>
      <div style={{ marginLeft: "149px", marginRight: "149px" }}>
        <Divider />
        <Container style={{ height: "81px" }}>
          <div style={{ marginTop: "20px", float: "left" }}>
            {/*
            <img
              src={logo2}
              alt="bits of good logo"
              width="213.62px"
              height="19px"
            />
            */}
          </div>
          <div
            style={{
              float: "left",
              marginTop: "20px",
              marginLeft: "70%",
              color: "#333333"
            }}
          >
            <CoreTypography variant="caption">Terms</CoreTypography>
          </div>
          <div
            style={{
              float: "left",
              marginTop: "20px",
              marginLeft: "24px",
              color: "#333333"
            }}
          >
            <CoreTypography variant="caption">Privacy</CoreTypography>
          </div>
          <div
            style={{
              float: "left",
              marginTop: "20px",
              marginLeft: "24px",
              color: "#333333"
            }}
          >
            <CoreTypography variant="caption">Legal</CoreTypography>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}
