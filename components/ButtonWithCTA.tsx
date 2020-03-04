import React from "react";
import clsx from "clsx";

import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    root: {
      borderRadius: 30
    },
    nonProfitColor: {
      backgroundColor: palette.nonProfitColors.secondary
    }
  })
);

type Props = React.ComponentProps<typeof Button> & {
  useNonProfitColor?: boolean;
};

const ButtonWithCTA: React.FC<Props> = ({
  children,
  className,
  color = "primary",
  useNonProfitColor = false,
  ...rest
}) => {
  const { root, nonProfitColor } = useStyles();

  return (
    <Button
      classes={{ root }}
      className={clsx(className, useNonProfitColor && nonProfitColor)}
      color={color}
      variant="contained"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default ButtonWithCTA;
