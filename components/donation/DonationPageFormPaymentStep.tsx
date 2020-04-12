import React, { useState, useCallback, useEffect, useMemo } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";

import { ContentComponentProps } from "components/auth/types";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column"
    },
    name: {
      display: "flex",
      justifyContent: "space-between"
    },
    checkedRadioButton: {
      color: "secondary"
    },
    width: {
      width: "33%"
    },
    textField: {
      paddingTop: 16
    },
    rightMargin: {
      marginRight: 24
    },
    verticalPositiveMargin: {
      marginTop: 14,
      marginBottom: 14
    },
    verticalNegativeMargin: {
      marginTop: -14,
      marginBottom: -14
    },
    formControl: {
      minWidth: 120
    }
  })
);

const PAYMENTTYPES = ["Card", "Paypal"];
const COUNTRIES = ["United States of America", "Canada"];

const DonationPageFormPaymentStep: React.FC<ContentComponentProps> = () => {
  const {
    container,
    name,
    rightMargin,
    verticalNegativeMargin,
    verticalPositiveMargin,
    checkedRadioButton,
    textField,
    width
  } = useStyles();

  const [selectedRadioButtonType, setSelectedRadioButtonType] = useState(
    PAYMENTTYPES[0]
  );
  const [countryOrRegion, setCountryOrRegion] = useState(COUNTRIES[0]);

  return (
    <div className={clsx(container, verticalNegativeMargin)}>
      <TextField
        fullWidth
        required
        label="Name on Card"
        className={verticalPositiveMargin}
      />
      <TextField
        fullWidth
        required
        label="Card Number"
        className={verticalPositiveMargin}
      />
      <TextField
        required
        fullWidth
        type="email"
        label="Email"
        className={verticalPositiveMargin}
      />
      <div className={clsx(name, verticalPositiveMargin)}>
        <TextField
          className={rightMargin}
          fullWidth
          required
          label="Expiration Date"
        />
        <TextField fullWidth required label="CVC" />
      </div>
      <div className={clsx(name, verticalPositiveMargin)}>
        <TextField
          className={rightMargin}
          fullWidth
          required
          label="First Name"
        />
        <FormControl variant="outlined" className={"formControl"}>
          <InputLabel htmlFor="outlined-country-native-simple">Age</InputLabel>
          <Select
            native
            value={countryOrRegion}
            inputProps={{
              name: "Country or Region",
              id: "outlined-country-native-simple"
            }}
          >
            <option aria-label="None" value="" />
            <option value={COUNTRIES[0]}>United States of America</option>
            <option value={COUNTRIES[1]}>Canada</option>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default DonationPageFormPaymentStep;
