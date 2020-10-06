import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    borderRadius: 100,
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.05)",
    background: "#FFFFFF",
    color: "#FD8033",
    border: 2,
    borderStyle: "solid",
    borderColor: "#FD8033"
  }
});

const HorizonButton: React.FC<React.ComponentProps<typeof Button>> = ({
  children,
  ...rest
}) => {
  const { root } = useStyles();

  return (
    <Button classes={{ root }} {...rest}>
      {children}
    </Button>
  );
};

export default HorizonButton;
