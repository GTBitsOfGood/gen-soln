import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Typography from "@material-ui/core/Typography";

import CoreLink from "@core/link";

import config from "config";

const useStyles = makeStyles({
  container: {
    display: "flex",
    margin: "auto -4px"
  },
  text: {
    marginLeft: 4,
    marginRight: 4
  }
});

const DonationPageFormAdminLoginLink: React.FC = () => {
  const { container, text } = useStyles();

  return (
    <div className={container}>
      <Typography className={text} variant="subtitle2" color="secondary">
        Are you an admin?
      </Typography>
      <CoreLink
        className={text}
        href={config.pages.login}
        variant="subtitle2"
        underline="always"
        color="secondary"
      >
        Login here
      </CoreLink>
    </div>
  );
};

export default DonationPageFormAdminLoginLink;
