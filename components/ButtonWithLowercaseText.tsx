import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    textTransform: "none"
  }
});

const ButtonWithLowercaseText: React.FC<React.ComponentProps<
  typeof Button
>> = ({ children, ...rest }) => {
  const { root } = useStyles();

  return (
    <Button classes={{ root }} {...rest}>
      {children}
    </Button>
  );
};

export default ButtonWithLowercaseText;
