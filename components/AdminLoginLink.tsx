import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Typography from "@material-ui/core/Typography";

import Link from "components/Link";

const useStyles = makeStyles({
  container: {
    display: "flex",
    margin: "auto -4px"
  },
  text: {
    marginLeft: 4,
    marginRight: 4,
    marginTop: 15
  }
});

const AdminLoginLink: React.FC = () => {
  const { container, text } = useStyles();

  return (
    <div className={container}>
      <Typography className={text} variant="subtitle2" color="secondary">
        Are you an admin?
      </Typography>
      <Link
        className={text}
        href="/login"
        variant="subtitle2"
        underline="always"
        color="secondary"
      >
        Login here
      </Link>
    </div>
  );
};

export default AdminLoginLink;
