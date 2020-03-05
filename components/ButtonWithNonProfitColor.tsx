import React from "react";
import clsx from "clsx";

import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    nonProfitColor: {
      backgroundColor: palette.nonProfitColors.secondary
    }
  })
);

const ButtonWithNonProfitColor: React.FC<React.ComponentProps<
  typeof Button
>> = ({ children, className, color = "primary", ...rest }) => {
  const { nonProfitColor } = useStyles();

  return (
    <Button
      className={clsx(className, nonProfitColor)}
      variant="contained"
      color={color}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonWithNonProfitColor;
