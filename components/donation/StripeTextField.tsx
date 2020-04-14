import React, { useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from "@stripe/react-stripe-js";
import TextField from "@material-ui/core/TextField";
import StripeInput from "./StripeInput";
import * as stripeJs from "@stripe/stripe-js";

type Props = React.ComponentProps<typeof TextField> & {
  stripeElement:
    | typeof CardNumberElement
    | typeof CardExpiryElement
    | typeof CardCvcElement;
  setHasCompleted: (val: boolean) => void;
};

// Code based on https://codesandbox.io/s/stripe-0xez4
const StripeTextField = ({
  stripeElement,
  setHasCompleted,
  InputLabelProps,
  InputProps,
  ...other
}: Props) => {
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
        // @ts-ignore
        const stripeEvent = e as stripeJs.StripeElementChangeEvent;
        setError(stripeEvent.error?.message ?? "");
        setHasCompleted(stripeEvent.complete);
      }}
      {...other}
    />
  );
};

export default StripeTextField;
