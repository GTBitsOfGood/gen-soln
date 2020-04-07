import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import DonationPageHeader from "./DonationPageHeader";

import FullPageLayout from "components/FullPageLayout";
import { DropdownProps } from "utils/types";

const useStyles = makeStyles(({ margins, nonprofitImages }: Theme) =>
  createStyles({
    container: {
      flexDirection: "column"
    },
    content: {
      flex: 1,
      display: "flex",
      backgroundImage: nonprofitImages.background,
      backgroundSize: "cover",
      backgroundRepeat: "repeat-y",
      backgroundPosition: "center",
      padding: `${margins.LARGE_VERTICAL} ${margins.HORIZONTAL}`
    }
  })
);

const DonationPageLayout: React.FC<DropdownProps> = ({
  children,
  ...dropdownProps
}) => {
  const { container, content } = useStyles();

  return (
    <FullPageLayout className={container}>
      <DonationPageHeader {...dropdownProps} />
      <div className={content}>{children}</div>
    </FullPageLayout>
  );
};

export default DonationPageLayout;
