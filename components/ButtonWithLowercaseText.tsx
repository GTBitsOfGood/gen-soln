import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  button: {
    textTransform: "none"
  }
});

const ButtonWithLowercaseText: React.FC<React.ComponentProps<
  typeof Button
>> = ({ children, ...rest }) => {
  const { button } = useStyles();

  return (
    <Button className={button} {...rest}>
      {children}
    </Button>
  );
};

export default ButtonWithLowercaseText;
