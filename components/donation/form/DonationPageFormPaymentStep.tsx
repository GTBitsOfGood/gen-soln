import React, { useEffect, useContext, useState } from "react";

import { TextField } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";
import clsx from "clsx";

import {
  DonationPageStateDispatch,
  PaymentStepProps,
  setNameOnCard,
  setIsCurStepCompleted
} from "./reducer";
import StripeTextField from "./StripeTextField";

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

const DonationPageFormPaymentStep: React.FC<PaymentStepProps> = ({
  nameOnCard
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
    </div>
  );
};

export default DonationPageFormPaymentStep;
