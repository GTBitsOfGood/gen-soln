import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 0
  },
  logo: {
    height: 16,
    marginRight: 4
  }
});

const BrandingHeader: React.FC = () => {
  const { header, logo } = useStyles();

  return (
    <header className={header}>
      <img className={logo} alt="Bits of Good logo" src="bog-logo.svg" />
      <Typography variant="subtitle2" color="secondary">
        &middot; Donation Marketplace Solution
      </Typography>
    </header>
  );
};

export default BrandingHeader;
