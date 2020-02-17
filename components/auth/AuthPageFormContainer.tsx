import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

const white = "white";
const useStyles = makeStyles({
  container: {
    backgroundColor: white,
    borderRadius: 10,
    boxShadow: "0 0px 5px 1px rgba(0, 0, 0, 0.1)",
    padding: 50,
    flex: 0.8,
    maxHeight: 450,
    maxWidth: 500
  }
});

const AuthPageFormContainer: React.FC = ({ children }) => {
  const { container } = useStyles();

  return <div className={container}>{children}</div>;
};

export default AuthPageFormContainer;
