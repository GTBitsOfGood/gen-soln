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
  setAddress,
  setZipcode
} from "./reducer";

const MAX_ZIP_CODE_LENGTH = 5;

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
  },
  fullWidth: {
    width: "100%"
  }
});

const DonationPageFormBillingStep: React.FC<BillingStepProps> = ({
  firstName,
  lastName,
  email,
  address,
  zipcode
}) => {
  const {
    container,
    name,
    rightMargin,
    verticalNegativeMargin,
    verticalPositiveMargin,
    fullWidth
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
          locationType="address"
          fullWidth
          required
          defaultValue={address}
          label="Address"
        />
      </div>
      <div className={clsx(name, verticalPositiveMargin)}>
        <TextField
          className={rightMargin}
          fullWidth
          required
          type="tel"
          label="Zipcode"
          autoComplete="postal-code"
          inputProps={{
            maxLength: MAX_ZIP_CODE_LENGTH,
            pattern: `[0-9s]{${MAX_ZIP_CODE_LENGTH}}`
          }}
          value={zipcode}
          onChange={e => {
            dispatch && dispatch(setZipcode(e.target.value));
          }}
          placeholder={"0".repeat(MAX_ZIP_CODE_LENGTH)}
        />
        <div className={fullWidth} />
      </div>
    </div>
  );
};

export default DonationPageFormBillingStep;
