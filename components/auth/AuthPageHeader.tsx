import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Typography from "@material-ui/core/Typography";

import Branding from "components/Branding";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    top: 0
  },
  text: {
    marginLeft: 6
  }
});

const AuthPageHeader: React.FC = () => {
  const { header, text } = useStyles();

  return (
    <header className={header}>
      <Branding />
      <Typography variant="overline" color="secondary" className={text}>
        &middot; Donation Marketplace Solution
      </Typography>
    </header>
  );
};

export default AuthPageHeader;
