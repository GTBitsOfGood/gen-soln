import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import ContainerWithShadow from "components/ContainerWithShadow";

const useStyles = makeStyles({
  container: {
    width: "34vw",
    height: "52vh",
    minWidth: 400
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "5vh 5.5vh"
  }
});

const AuthPageFormContainer: React.FC = ({ children }) => {
  const { container, contentContainer } = useStyles();

  return (
    <ContainerWithShadow className={container}>
      <div className={contentContainer}>{children}</div>
    </ContainerWithShadow>
  );
};

export default AuthPageFormContainer;
