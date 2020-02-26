import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    borderRadius: 30
  }
});

const ButtonWithCTA: React.FC<React.ComponentProps<typeof Button>> = ({
  children,
  ...rest
}) => {
  const { root } = useStyles();

  return (
    <Button classes={{ root }} color="primary" variant="contained" {...rest}>
      {children}
    </Button>
  );
};

export default ButtonWithCTA;
