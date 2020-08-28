import React, { useCallback, useEffect, useMemo, useContext } from "react";
import clsx from "clsx";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// @ts-ignore: We don't have type definitions for CurrencyTextField
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

import {
  AmountStepProps,
  DonationPageStateDispatch,
  setRadioButtonAmount,
  setOtherAmount,
  setIsContinueButtonDisabled,
  AMOUNTS,
  MIN_OTHER_AMOUNT,
  MAX_OTHER_AMOUNT
} from "./reducer";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column"
    },
    checkedRadioButton: {
      color: palette.nonprofitSecondary
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

const DonationPageFormAmountStep: React.FC<AmountStepProps> = ({
  radioButtonAmount,
  otherAmount
}) => {
  const { checkedRadioButton, textField, container, root, width } = useStyles();
  const dispatch = useContext(DonationPageStateDispatch);

  const hasSelectedOther = useMemo(() => radioButtonAmount == null, [
    radioButtonAmount
  ]);

  const isContinueButtonDisabled = useMemo(
    () =>
      hasSelectedOther &&
      (otherAmount < +MIN_OTHER_AMOUNT || otherAmount > +MAX_OTHER_AMOUNT),
    [hasSelectedOther, otherAmount]
  );

  useEffect(() => {
    dispatch && dispatch(setIsContinueButtonDisabled(isContinueButtonDisabled));
  }, [dispatch, isContinueButtonDisabled]);

  const handleRadioAmountChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (dispatch) {
        dispatch(setOtherAmount(+MIN_OTHER_AMOUNT));
        dispatch(setRadioButtonAmount(+event.target.value));
      }
    },
    [dispatch]
  );

  const handleOtherAmountChange = useCallback(
    (_, value) => {
      dispatch && dispatch(setOtherAmount(value));
    },
    [dispatch]
  );

  const handleHasSelectedOther = useCallback(() => {
    dispatch && dispatch(setRadioButtonAmount(null));
  }, [dispatch]);

  const radioButtons = AMOUNTS.map(amount => (
    <FormControlLabel
      classes={{ root }}
      key={amount}
      value={amount}
      control={
        <Radio
          color="default"
          className={clsx(amount === radioButtonAmount && checkedRadioButton)}
        />
      }
      label={`$${amount}`}
    />
  ));

  return (
    <div className={container}>
      <RadioGroup
        row
        value={radioButtonAmount}
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
        placeholder={MIN_OTHER_AMOUNT}
        minimumValue={MIN_OTHER_AMOUNT}
        maximumValue={MAX_OTHER_AMOUNT}
        onChange={handleOtherAmountChange}
        overrideMinMaxLimits="invalid"
      />
    </div>
  );
};

export default DonationPageFormAmountStep;
