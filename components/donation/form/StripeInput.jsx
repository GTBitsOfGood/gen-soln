import React, { useState, useImperativeHandle } from "react";

import { typographyStyles } from "@core/typography";

// Code based on https://codesandbox.io/s/stripe-0xez4
const StripeInput = props => {
  const { component: Component, inputRef, ...other } = props;
  const [mountNode, setMountNode] = useState(null);

  useImperativeHandle(
    inputRef,
    () => ({
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
            fontSize: typographyStyles.body1.fontSize,
            // For some reason the font family "OpenSans-Regular" does not seem to be loaded
            fontFamily: `${typographyStyles.body1.fontFamily}, "Open Sans", "sans-serif"`
          }
        }
      }}
      {...other}
    />
  );
};

export default StripeInput;
