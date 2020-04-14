import React, { useEffect, useContext, useState } from "react";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";

import TextField from "@material-ui/core/TextField";

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";

import StripeTextField from "./StripeTextField";

import {
  DonationPageStateDispatch,
  PaymentStepProps,
  setNameOnCard,
  setZipcode,
  setIsContinueButtonDisabled
} from "./reducer";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  rowFlex: {
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

const MAX_ZIP_CODE_LENGTH = 5;

const DonationPageFormPaymentStep: React.FC<PaymentStepProps> = ({
  nameOnCard,
  zipcode
}) => {
  const {
    container,
    rowFlex,
    rightMargin,
    verticalNegativeMargin,
    verticalPositiveMargin,
    fullWidth
  } = useStyles();
  const dispatch = useContext(DonationPageStateDispatch);
  const [hasCompletedCardNumber, setHasCompletedCardNumber] = useState(false);
  const [hasCompletedExpirationDate, setHasCompletedExpirationDate] = useState(
    false
  );
  const [hasCompletedCVC, setHasCompletedCVC] = useState(false);

  useEffect(() => {
    dispatch &&
      dispatch(
        setIsContinueButtonDisabled(
          !hasCompletedCardNumber ||
            !hasCompletedExpirationDate ||
            !hasCompletedCVC
        )
      );
  }, [
    dispatch,
    hasCompletedCardNumber,
    hasCompletedExpirationDate,
    hasCompletedCVC
  ]);

  return (
    <div className={clsx(container, verticalNegativeMargin)}>
      <TextField
        fullWidth
        required
        autoComplete="cc-name"
        label="Name on Card"
        className={verticalPositiveMargin}
        value={nameOnCard}
        onChange={e => {
          dispatch && dispatch(setNameOnCard(e.target.value));
        }}
      />
      <StripeTextField
        className={verticalPositiveMargin}
        label="Card Number"
        stripeElement={CardNumberElement}
        setHasCompleted={(val: boolean) => {
          setHasCompletedCardNumber(val);
        }}
      />
      <div className={clsx(rowFlex, verticalPositiveMargin)}>
        <StripeTextField
          className={rightMargin}
          label="Expiration Date"
          stripeElement={CardExpiryElement}
          setHasCompleted={(val: boolean) => {
            setHasCompletedExpirationDate(val);
          }}
        />
        <StripeTextField
          label="CVC"
          stripeElement={CardCvcElement}
          setHasCompleted={(val: boolean) => {
            setHasCompletedCVC(val);
          }}
        />
      </div>
      <div className={clsx(rowFlex, verticalPositiveMargin)}>
        <TextField
          fullWidth
          required
          type="tel"
          label="Zipcode"
          autoComplete="postal-code"
          className={rightMargin}
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

export default DonationPageFormPaymentStep;
