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
  addressLine1,
  addressLine2,
  city,
  state,
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
      key: keyof BillingStepProps,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string
    ) => {
      if (typeof e === "string") {
        dispatch && dispatch(setBillingStepField({ key, value: e }));
      } else {
        dispatch &&
          dispatch(setBillingStepField({ key, value: e.target.value }));
      }
    },
    [dispatch]
  );

  const onAutocompleteAddressChange = useCallback(
    (address: PlaceType) => {
      const addressLine1 = address.structured_formatting.main_text;
      const [city, state] = address.structured_formatting.secondary_text.split(
        ", "
      );
      if (dispatch) {
        dispatch(
          setBillingStepField({ key: "addressLine1", value: addressLine1 })
        );
        dispatch(setBillingStepField({ key: "city", value: city }));
        dispatch(setBillingStepField({ key: "state", value: state }));
      }
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
          parentCallback={onAutocompleteAddressChange}
          parentInputChangeCallback={e => {
            onChange("addressLine1", e);
          }}
          locationType="address"
          fullWidth
          required
          defaultInputValue={addressLine1}
          label="Address Line 1"
          outlined={false}
          textVariant="body1"
        />
      </div>
      <div className={clsx(name, verticalPositiveMargin)}>
        <TextField
          fullWidth
          label="Address Line 2"
          value={addressLine2}
          onChange={e => {
            onChange("addressLine2", e);
          }}
          autoComplete="address-line2"
        />
      </div>
      <div className={clsx(name, verticalPositiveMargin)}>
        <TextField
          required
          fullWidth
          label="City"
          className={rightMargin}
          value={city}
          onChange={e => {
            onChange("city", e);
          }}
          autoComplete="address-level2"
        />
        <TextField
          required
          fullWidth
          label="State"
          value={state}
          onChange={e => {
            onChange("state", e);
          }}
          autoComplete="address-level1"
        />
      </div>
      <div className={clsx(name, verticalPositiveMargin)}>
        <TextField
          className={rightMargin}
          fullWidth
          required
          type="tel"
          label="Billing Zipcode"
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
