import React, { useState, useCallback, useEffect, useMemo } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// @ts-ignore
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

import { ContentComponentProps } from "./types";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column"
    },
    checkedRadioButton: {
      color: palette.nonprofitColors.secondary
    },
    width: {
      width: "33%"
    },
    root: {
      marginRight: 24
    },
    textField: {
      paddingTop: 16
    }
  })
);

const AMOUNTS = [25, 50, 100, 250, 500];

const MIN_OTHER_AMOUNT = "0";
const MAX_OTHER_AMOUNT = "2000";

const DonationPageFormAmountStep: React.FC<ContentComponentProps> = ({
  setIsContinueButtonDisabled
}) => {
  const { checkedRadioButton, textField, container, root, width } = useStyles();

  const [selectedRadioButtonAmount, setSelectedRadioButtonAmount] = useState<
    number | null
  >(AMOUNTS[0]);
  const [otherAmount, setOtherAmount] = useState(0);
  const [hasSelectedOther, setHasSelectedOther] = useState(false);

  const isContinueButtonDisabled = useMemo(
    () => hasSelectedOther && otherAmount <= 0,
    [hasSelectedOther, otherAmount]
  );

  useEffect(() => {
    setIsContinueButtonDisabled(isContinueButtonDisabled);
  }, [setIsContinueButtonDisabled, isContinueButtonDisabled]);

  const handleRadioAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherAmount(0);
    setHasSelectedOther(false);
    setSelectedRadioButtonAmount(+event.target.value);
  };

  const handleOtherAmountChange = useCallback((_, value) => {
    setOtherAmount(value);
  }, []);

  const handleHasSelectedOther = useCallback(() => {
    setHasSelectedOther(!hasSelectedOther);
    setSelectedRadioButtonAmount(null);
  }, [hasSelectedOther]);

  const radioButtons = AMOUNTS.map(amount => (
    <FormControlLabel
      classes={{ root }}
      key={amount}
      value={amount}
      control={
        <Radio
          color="default"
          className={clsx(
            amount === selectedRadioButtonAmount && checkedRadioButton
          )}
        />
      }
      label={`$${amount}`}
    />
  ));

  return (
    <div className={container}>
      <RadioGroup
        row
        value={selectedRadioButtonAmount}
        onChange={handleRadioAmountChange}
      >
        {radioButtons}
      </RadioGroup>
      <FormControlLabel
        label={`Other (Max $${MAX_OTHER_AMOUNT})`}
        control={
          <Radio
            color="default"
            checked={hasSelectedOther}
            onChange={handleHasSelectedOther}
            className={clsx(hasSelectedOther && checkedRadioButton)}
          />
        }
      />
      <CurrencyTextField
        classes={{ textField }}
        className={width}
        variant="filled"
        value={otherAmount}
        disabled={!hasSelectedOther}
        placeholder={"0.00"}
        minimumValue={MIN_OTHER_AMOUNT}
        maximumValue={MAX_OTHER_AMOUNT}
        onChange={handleOtherAmountChange}
      />
    </div>
  );
};

export default DonationPageFormAmountStep;
