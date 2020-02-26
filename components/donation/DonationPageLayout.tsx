import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import DonationPageHeader from "./DonationPageHeader";

import FullPageLayout from "components/FullPageLayout";

const useStyles = makeStyles(({ palette, margins }: Theme) =>
  createStyles({
    container: {
      flexDirection: "column"
    },
    content: {
      flex: 1,
      backgroundColor: palette.background.imagePlaceholder,
      paddingLeft: margins.LEFT,
      paddingTop: margins.VERTICAL,
      paddingBottom: margins.VERTICAL
    }
  })
);

const DonationPageLayout: React.FC = ({ children }) => {
  const { container, content } = useStyles();

  return (
    <FullPageLayout className={container}>
      <DonationPageHeader />
      <div className={content}>{children}</div>
    </FullPageLayout>
  );
};

export default DonationPageLayout;
