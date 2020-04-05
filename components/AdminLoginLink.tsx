import React from "react";

import clsx from "clsx";

import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

import Link from "@material-ui/core/Link";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    nonProfitColor: {
      backgroundColor: palette.nonprofitColors.secondary
    }
  })
);

const AdminLoginLink: React.FC<React.ComponentProps<typeof Link>> = ({
  children,
  className,
  color = "primary",
  ...rest
}) => {
  const { nonProfitColor } = useStyles();

  return (
    <div>
      <Typography className={clsx(className)} color={color} {...rest}>
        Are you an admin?
      </Typography>
      <Link className={clsx(className)} color={color} {...rest} href="/login">
        Click here to login!
      </Link>
    </div>
  );
};

export default AdminLoginLink;
