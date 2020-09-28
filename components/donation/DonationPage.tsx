import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import ContainerWithShadow from "components/ContainerWithShadow";
import { Nonprofit, DropdownProps } from "utils/types";

import DonationPageLayout from "./DonationPageLayout";
import DonationPageNonprofitBanner from "./DonationPageNonprofitBanner";
import DonationPageMainContent from "./DonationPageMainContent";

const useStyles = makeStyles({
  container: {
    minWidth: 420,
    flex: 0.48
  }
});

interface Props {
  nonprofit: Nonprofit;
}

const DonationPage: React.FC<Props & DropdownProps> = ({
  nonprofit,
  ...dropdownProps
}) => {
  const { container } = useStyles();

  // Setting key will tell React to re-mount the DonationPageMainContent component when the selected Nonprofit in the dropdown changes
  return (
    <DonationPageLayout {...dropdownProps}>
      <ContainerWithShadow className={container}>
        <DonationPageNonprofitBanner headline={nonprofit.headline} />
        <DonationPageMainContent
          description={nonprofit.about}
          selectedNonprofitId={dropdownProps.selectedValue}
          stripeAccount={nonprofit.stripeAccount}
          key={dropdownProps.selectedValue}
        />
      </ContainerWithShadow>
    </DonationPageLayout>
  );
};

export default DonationPage;
