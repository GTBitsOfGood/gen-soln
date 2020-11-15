import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import FullPageLayout from "components/FullPageLayout";

import DonationPageHeader from "./header/DonationPageHeader";

const useStyles = makeStyles({
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
});

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
