import React, { useState, useImperativeHandle } from "react";

import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement
} from "@stripe/react-stripe-js";

import { typographyStyles } from "@core/typography";

interface Props {
  component:
    | typeof CardNumberElement
    | typeof CardExpiryElement
    | typeof CardCvcElement;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputRef: React.Ref<any>;
}

// Code based on https://codesandbox.io/s/stripe-0xez4
const StripeInput: React.FC<Props> = ({
  component: Component,
  inputRef,
  ...other
}) => {
  const [mountNode, setMountNode] = useState(null);

  useImperativeHandle(
    inputRef,
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return,@typescript-eslint/no-explicit-any
      focus: () => (mountNode as any).focus()
    }),
    [mountNode]
  );

  return (
    <Component
      // setMountNode technically should be stripeJs.StripeCardCvcElement, etc.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-explicit-any
      onReady={setMountNode as any}
      options={{
        style: {
          base: {
            fontSize: typographyStyles.body1.fontSize as string,
            // For some reason the font family "OpenSans-Regular" does not seem to be loaded,
            // so we define some fallback fonts
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            fontFamily: `${typographyStyles.body1
              .fontFamily!}, "Open Sans", "sans-serif"`
          }
        }
      }}
      {...other}
    />
  );
};

export default StripeInput;
