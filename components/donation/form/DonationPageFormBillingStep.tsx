import React, { useContext, useCallback, useEffect } from "react";

import { TextField } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";

import LocationAutocompleteInput, {
  PlaceType
} from "components/LocationAutocompleteInput";

import {
  BillingStepProps,
  DonationPageStateDispatch,
  setBillingStepField,
  setIsCurStepCompleted,
  setAddress
} from "./reducer";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  name: {
    display: "flex",
    justifyContent: "space-between"
  },
  rightMargin: {
    marginRight: 24
  },
  verticalPositiveMargin: {
    marginTop: 7,
    marginBottom: 7
  },
  verticalNegativeMargin: {
    marginTop: -7,
    marginBottom: -7
  }
});

const DonationPageFormBillingStep: React.FC<BillingStepProps> = ({
  firstName,
  lastName,
  email,
  address
}) => {
  const {
    container,
    name,
    rightMargin,
    verticalNegativeMargin,
    verticalPositiveMargin
  } = useStyles();
  const dispatch = useContext(DonationPageStateDispatch);

  useEffect(() => {
    // For this step, we will defter to the browser's API to indicate when the required TextFields have been filled
    dispatch && dispatch(setIsCurStepCompleted(true));
  }, [dispatch]);

  const onChange = useCallback(
    (
      key: keyof Omit<BillingStepProps, "address">,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      dispatch && dispatch(setBillingStepField({ key, value: e.target.value }));
    },
    [dispatch]
  );

  const onAddressChange = useCallback(
    (address: PlaceType) => {
      dispatch && dispatch(setAddress(address));
    },
    [dispatch]
  );

  return (
    <div className={clsx(container, verticalNegativeMargin)}>
      <div className={clsx(name, verticalPositiveMargin)}>
        <TextField
          className={rightMargin}
          fullWidth
          required
          label="First Name"
          value={firstName}
          onChange={e => {
            onChange("firstName", e);
          }}
          autoComplete="given-name"
        />
        <TextField
          fullWidth
          required
          label="Last Name"
          value={lastName}
          onChange={e => {
            onChange("lastName", e);
          }}
          autoComplete="family-name"
        />
      </div>
      <TextField
        required
        fullWidth
        type="email"
        label="Email"
        className={verticalPositiveMargin}
        value={email}
        onChange={e => {
          onChange("email", e);
        }}
        autoComplete="email"
      />
      <div className={clsx(name, verticalPositiveMargin)}>
        <LocationAutocompleteInput
          parentCallback={onAddressChange}
          type="PASS_PLACE_TYPE_TO_PARENT"
          locationType="address"
          fullWidth
          required
          defaultValue={address}
          label="Address"
        />
      </div>
    </div>
  );
};

export default DonationPageFormBillingStep;