import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";
import StripeInput from "./StripeInput";
import * as stripeJs from "@stripe/stripe-js";
import { TextField } from "@material-ui/core";

type Props = React.ComponentProps<typeof TextField> & {
  stripeElement:
    | typeof CardNumberElement
    | typeof CardExpiryElement
    | typeof CardCvcElement;
  setHasCompleted: (val: boolean) => void;
};

// Code based on https://codesandbox.io/s/stripe-0xez4
const StripeTextField: React.FC<Props> = ({
  stripeElement,
  setHasCompleted,
  InputLabelProps,
  InputProps,
  ...other
}) => {
  const [error, setError] = useState("");

  return (
    <TextField
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true
      }}
      InputProps={{
        ...InputProps,
        inputProps: {
          component: stripeElement
        },
        inputComponent: StripeInput
      }}
      error={Boolean(error)}
      helperText={error}
      onChange={e => {
        // @ts-ignore Stripe will ensure that this error is of the right type
        const stripeEvent = e as stripeJs.StripeElementChangeEvent;
        setError(stripeEvent.error?.message ?? "");
        setHasCompleted(stripeEvent.complete);
      }}
      {...other}
    />
  );
};

export default StripeTextField;
