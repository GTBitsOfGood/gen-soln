import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  button: {
    borderRadius: 30
  }
});

const ButtonWithCTA: React.FC<React.ComponentProps<typeof Button>> = ({
  children,
  ...rest
}) => {
  const { button } = useStyles();

  return (
    <Button className={button} color="primary" variant="contained" {...rest}>
      {children}
    </Button>
  );
};

export default ButtonWithCTA;
