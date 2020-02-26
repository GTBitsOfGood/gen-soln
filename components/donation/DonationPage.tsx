import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import ContainerWithShadow from "components/ContainerWithShadow";

import DonationPageLayout from "./DonationPageLayout";

const useStyles = makeStyles({
  container: {
    maxHeight: 788,
    maxWidth: 588,
    padding: 16
  }
});

const DonationPage: React.FC = () => {
  const { container } = useStyles();

  return (
    <DonationPageLayout>
      <ContainerWithShadow className={container}>TODO</ContainerWithShadow>
    </DonationPageLayout>
  );
};

export default DonationPage;
