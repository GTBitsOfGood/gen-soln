import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import FullPageLayout from "components/FullPageLayout";

import DonationPageHeader from "./header/DonationPageHeader";

const useStyles = makeStyles<Theme>(({ margins }) =>
  createStyles({
    container: {
      flexDirection: "column"
    },
    content: {
      flex: 1,
      backgroundColor: "#FFFAF1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }
  })
);

type Props = React.ComponentProps<typeof DonationPageHeader>;

const DonationPageLayout: React.FC<Props> = ({ children, ...rest }) => {
  const { container, content } = useStyles({});

  return (
    <FullPageLayout className={container}>
      <DonationPageHeader {...rest} />
      <div className={content}>{children}</div>
    </FullPageLayout>
  );
};

export default DonationPageLayout;
