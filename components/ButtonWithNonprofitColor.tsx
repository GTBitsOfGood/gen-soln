import React from "react";
import clsx from "clsx";

import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    nonprofitColor: {
      backgroundColor: palette.nonprofitColors.secondary
    }
  })
);

const ButtonWithNonprofitColor: React.FC<React.ComponentProps<
  typeof Button
>> = ({ children, className, color = "primary", ...rest }) => {
  const { nonprofitColor } = useStyles();

  return (
    <Button
      className={clsx(className, nonprofitColor)}
      variant="contained"
      color={color}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonWithNonprofitColor;
