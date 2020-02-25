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
  },
  imglink: {
    lineHeight: 0
  }
});

const BrandingHeader: React.FC = () => {
  const { header, logo, imglink } = useStyles();

  return (
    <header className={header}>
      <a className={imglink} href="https://www.bitsofgood.org/">
        <img className={logo} alt="Bits of Good Logo" src="bog-logo.svg" />
      </a>
      <Typography variant="subtitle2" color="secondary">
        &middot; Donation Marketplace Solution
      </Typography>
    </header>
  );
};

export default BrandingHeader;
