import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Typography from "@material-ui/core/Typography";

import HorizonLink from "@horizon/HorizonLink";

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
      <HorizonLink
        className={text}
        href="/login"
        variant="subtitle2"
        underline="always"
        color="secondary"
      >
        Login here
      </HorizonLink>
    </div>
  );
};

export default DonationPageFormAdminLoginLink;
