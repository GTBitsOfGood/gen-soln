import React, { useEffect, useContext, useState } from "react";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";

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
  setIsCurStepCompleted
} from "./reducer";

import { TextField } from "@material-ui/core";

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
  width: {
    width: "55%"
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
    width
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
        setIsCurStepCompleted(
          hasCompletedCardNumber &&
            hasCompletedExpirationDate &&
            hasCompletedCVC
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
        fullWidth
        label="Card Number"
        className={verticalPositiveMargin}
        stripeElement={CardNumberElement}
        setHasCompleted={(val: boolean) => {
          setHasCompletedCardNumber(val);
        }}
      />
      <div className={clsx(rowFlex, verticalPositiveMargin)}>
        <StripeTextField
          fullWidth
          label="Expiration Date"
          className={rightMargin}
          stripeElement={CardExpiryElement}
          setHasCompleted={(val: boolean) => {
            setHasCompletedExpirationDate(val);
          }}
        />
        <StripeTextField
          label="CVC"
          className={width}
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
        <div className={width} />
      </div>
    </div>
  );
};

export default DonationPageFormPaymentStep;
