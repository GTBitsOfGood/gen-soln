import React from "react";

import { Typography, IconButton, Tooltip } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { QuestionIcon } from "@core/icons";
import Branding from "components/Branding";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    marginLeft: "auto"
  },
  text: {
    marginRight: 6
  },
  buttonContainer: {
    marginLeft: 4,
    alignSelf: "flex-start"
  },
  buttonRoot: {
    padding: 0
  },
  icon: {
    fontSize: "0.8rem"
  }
});

const TOOLTIP_TEXT =
  "Bits of Good is a student-run organization in which talented software developers are given the opportunity to build online tools for local nonprofits.";

const DonationPageHeaderBranding: React.FC = () => {
  const { container, text, buttonContainer, buttonRoot, icon } = useStyles();

  return (
    <div className={container}>
      <Typography variant="overline" color="secondary" className={text}>
        This page is powered by
      </Typography>
      <Branding />
      <Tooltip title={TOOLTIP_TEXT} arrow>
        <IconButton
          classes={{ root: buttonRoot }}
          color="secondary"
          disableRipple
          className={buttonContainer}
        >
          <QuestionIcon classes={{ root: icon }} />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default DonationPageHeaderBranding;
