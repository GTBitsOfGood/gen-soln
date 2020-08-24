import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import { DropdownProps } from "utils/types";

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
      padding: `6px ${margins.HORIZONTAL}`
    }
  })
);

const DonationPageHeader: React.FC<DropdownProps> = props => {
  const { header } = useStyles();

  return (
    <header className={header}>
      <DonationPageHeaderSelect {...props} />
      <DonationPageHeaderBranding />
    </header>
  );
};

export default DonationPageHeader;
