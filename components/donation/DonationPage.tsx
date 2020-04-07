import React, { useReducer } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import ContainerWithShadow from "components/ContainerWithShadow";
import { Nonprofit, DropdownProps } from "utils/types";

import DonationPageLayout from "./DonationPageLayout";
import DonationPageFormHeader from "./DonationPageFormHeader";
import DonationPageFormBody from "./DonationPageFormBody";

import reducer, { initialState, DonationPageStateDispatch } from "./reducer";

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
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DonationPageStateDispatch.Provider value={dispatch}>
      <DonationPageLayout {...dropdownProps}>
        <ContainerWithShadow className={container}>
          <DonationPageFormHeader headline={nonprofit.headline} />
          <DonationPageFormBody state={state} description={nonprofit.about} />
        </ContainerWithShadow>
      </DonationPageLayout>
    </DonationPageStateDispatch.Provider>
  );
};

export default DonationPage;
