import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import ContainerWithShadow from "components/ContainerWithShadow";
import { Nonprofit, DropdownProps } from "utils/types";

import DonationPageLayout from "./DonationPageLayout";
import DonationPageFormHeader from "./DonationPageFormHeader";
import DonationPageFormBody from "./DonationPageFormBody";

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

  // Setting key will tell React to re-mount the DonationPageFormBody component when the selected Nonprofit in the dropdown changes
  return (
    <DonationPageLayout {...dropdownProps}>
      <ContainerWithShadow className={container}>
        <DonationPageFormHeader headline={nonprofit.headline} />
        <DonationPageFormBody
          description={nonprofit.about}
          selectedNonprofitId={dropdownProps.selectedValue}
          key={dropdownProps.selectedValue}
        />
      </ContainerWithShadow>
    </DonationPageLayout>
  );
};

export default DonationPage;
