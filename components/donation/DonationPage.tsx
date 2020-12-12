import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import ContainerWithShadow from "components/ContainerWithShadow";
import { Nonprofit, DropdownProps } from "utils/types";

import DonationPageLayout from "./DonationPageLayout";
import DonationPageMainContent from "./DonationPageMainContent";
import DonationPageNonprofitBanner from "./DonationPageNonprofitBanner";

const useStyles = makeStyles({
  container: {
    minWidth: 420,
    flex: 0.48,
    width: "50%"
  }
});

interface Props {
  nonprofit: Nonprofit;
}

const DonationPage: React.FC<Props & DropdownProps> = ({
  nonprofit: { headline, about, stripeAccount, logo },
  ...dropdownProps
}) => {
  const { container } = useStyles();

  // Setting key will tell React to re-mount the DonationPageMainContent component when the selected Nonprofit in the dropdown changes
  return (
    <DonationPageLayout {...dropdownProps}>
      <ContainerWithShadow className={container}>
        <DonationPageNonprofitBanner headline={headline} logoImage={logo} />
        <DonationPageMainContent
          description={about}
          selectedNonprofitId={dropdownProps.selectedValue}
          stripeAccount={stripeAccount}
          key={dropdownProps.selectedValue}
        />
      </ContainerWithShadow>
    </DonationPageLayout>
  );
};

export default DonationPage;
