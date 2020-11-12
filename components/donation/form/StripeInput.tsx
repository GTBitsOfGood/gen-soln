import React, { useState, useImperativeHandle } from "react";

import { InputBaseComponentProps } from "@material-ui/core";

import { typographyStyles } from "@core/typography";

// Code based on https://codesandbox.io/s/stripe-0xez4 and https://github.com/mui-org/material-ui/issues/16037#issuecomment-698339520
const StripeInput: React.FC<InputBaseComponentProps> = ({
  component: Component,
  inputRef,
  ...other
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [mountNode, setMountNode] = useState<typeof Component | null>(null);

  useImperativeHandle(
    inputRef,
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      focus: () => mountNode.focus()
    }),
    [mountNode]
  );

  return (
    <Component
      onReady={setMountNode}
      options={{
        style: {
          base: {
            fontSize: typographyStyles.body1.fontSize as string,
            // For some reason the font family "OpenSans-Regular" does not seem to be loaded, so we define some fallback fonts
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
