import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

const white = "white";
const useStyles = makeStyles({
  container: {
    backgroundColor: white,
    borderRadius: 8,
    paddingLeft: "9%",
    paddingRight: "9%",
    paddingTop: "10%",
    paddingBottom: "10%",
    flex: 0.8,
    maxHeight: 592,
    maxWidth: 486
  }
});

const AuthPageFormContainer: React.FC = ({ children }) => {
  const { container } = useStyles();

  return <div className={container}>{children}</div>;
};

export default AuthPageFormContainer;
