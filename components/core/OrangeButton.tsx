import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    borderRadius: 100,
    boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.05)",
    background: "#FD8033",
    color: "white"
  }
});

const OrangeButton: React.FC<React.ComponentProps<typeof Button>> = ({
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

export default OrangeButton;
