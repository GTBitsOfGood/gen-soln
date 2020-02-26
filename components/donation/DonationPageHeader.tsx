import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import DonationPageHeaderSelect from "./DonationPageHeaderSelect";
import DonationPageHeaderBranding from "./DonationPageHeaderBranding";

const white = "white";

const useStyles = makeStyles(({ margins }: Theme) =>
  createStyles({
    header: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: white,
      padding: 16,
      paddingLeft: margins.LEFT,
      paddingRight: margins.LEFT
    }
  })
);

const DonationPageHeader: React.FC = () => {
  const { header } = useStyles();

  return (
    <header className={header}>
      <DonationPageHeaderSelect />
      <DonationPageHeaderBranding />
    </header>
  );
};

export default DonationPageHeader;
