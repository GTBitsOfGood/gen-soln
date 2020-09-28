import React from "react";
import clsx from "clsx";

import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const white = "white";
const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    nonprofitColor: {
      backgroundColor: palette.nonprofitSecondary,
      color: white,
      "&:hover": {
        backgroundColor: palette.nonprofitSecondary
      }
    }
  })
);

const ButtonWithNonprofitColor: React.FC<React.ComponentProps<
  typeof Button
>> = ({ children, className, ...rest }) => {
  const { nonprofitColor } = useStyles();

  return (
    <Button
      className={clsx(className, nonprofitColor)}
      variant="contained"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonWithNonprofitColor;
