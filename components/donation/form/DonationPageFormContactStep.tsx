import React, { useContext, useCallback, useEffect, useMemo } from "react";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";

import LocationAutocompleteInput, {
  PlaceType
} from "components/LocationAutocompleteInput";

import {
  ContactStepProps,
  DonationPageStateDispatch,
  setContactStepField,
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

const DonationPageFormContactStep: React.FC<ContactStepProps> = ({
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
      key: keyof Omit<ContactStepProps, "address">,
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      dispatch && dispatch(setContactStepField({ key, value: e.target.value }));
    },
    [dispatch]
  );

  const onAddressChange = useCallback(
    (address: PlaceType | null) => {
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
          addPlaceChip={onAddressChange}
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

export default DonationPageFormContactStep;
