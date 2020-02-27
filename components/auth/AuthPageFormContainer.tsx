import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import ContainerWithShadow from "components/ContainerWithShadow";

const useStyles = makeStyles({
  container: {
    paddingLeft: "9%",
    paddingRight: "9%",
    paddingTop: "10%",
    paddingBottom: "10%",
    maxHeight: 592,
    maxWidth: 486
  }
});

const AuthPageFormContainer: React.FC = ({ children }) => {
  const { container } = useStyles();

  return (
    <ContainerWithShadow className={container}>{children}</ContainerWithShadow>
  );
};

export default AuthPageFormContainer;
