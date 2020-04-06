import React from "react";

import clsx from "clsx";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Link from "@material-ui/core/Link";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  text: {
    marginRight: 6
  }
});

const AdminLoginLink: React.FC<React.ComponentProps<typeof Link>> = ({
  children,
  className,
  color = "secondary",
  ...rest
}) => {
  const { container, text } = useStyles();

  return (
    <div className={clsx(container)}>
      <Typography
        className={clsx(text)}
        color={color}
        {...rest}
        variant="subtitle2"
      >
        Are you an admin?
      </Typography>
      <Link
        className={clsx(text)}
        color={color}
        {...rest}
        href="/login"
        variant="subtitle2"
        underline="always"
      >
        Login here
      </Link>
    </div>
  );
};

export default AdminLoginLink;
