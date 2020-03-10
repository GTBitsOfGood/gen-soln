import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import DonationPageHeader from "./DonationPageHeader";

import FullPageLayout from "components/FullPageLayout";

const useStyles = makeStyles(({ margins, nonProfitImages }: Theme) =>
  createStyles({
    container: {
      flexDirection: "column"
    },
    content: {
      flex: 1,
      display: "flex",
      backgroundImage: nonProfitImages.background,
      backgroundSize: "cover",
      backgroundPositionY: "-56vh", // TODO: The current image asset is a bit weird, hence the hacky offset. Perhaps ask for another version of the asset.
      backgroundRepeat: "no-repeat",
      padding: `${margins.LARGE_VERTICAL} ${margins.HORIZONTAL}`
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
