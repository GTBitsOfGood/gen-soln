import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  logo: {
    height: 16
  },
  imglink: {
    lineHeight: 0,
    marginTop: -2
  }
});

const Branding: React.FC = () => {
  const { logo, imglink } = useStyles();

  return (
    <a className={imglink} href="https://www.bitsofgood.org/">
      <img className={logo} alt="Bits of Good Logo" src="/site/bog-logo.svg" />
    </a>
  );
};

export default Branding;
