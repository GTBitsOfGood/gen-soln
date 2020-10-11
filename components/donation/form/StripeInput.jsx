import React, { useState, useImperativeHandle } from "react";

import { fade, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette, typography }) =>
  createStyles({
    base: {
      color: palette.text.primary,
      fontSize: typography.fontSize,
      fontFamily: typography.fontFamily,
      "::placeholder": {
        color: fade(palette.text.primary, 0.42)
      }
    },
    invalid: {
      color: palette.text.primary
    }
  })
);

// Code based on https://codesandbox.io/s/stripe-0xez4
const StripeInput = props => {
  const { component: Component, inputRef, ...other } = props;
  const { base, invalid } = useStyles();
  const [mountNode, setMountNode] = useState(null);

  useImperativeHandle(
    inputRef,
    () => ({
      focus: () => mountNode.focus()
    }),
    [mountNode]
  );

  // TODO: These styles don't seem to be doing anything?
  return (
    <Component
      onReady={setMountNode}
      style={{
        base,
        invalid
      }}
      {...other}
    />
  );
};

export default StripeInput;
