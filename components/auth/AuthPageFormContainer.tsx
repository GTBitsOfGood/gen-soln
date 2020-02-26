import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import ContainerWithShadow from "components/ContainerWithShadow";

const useStyles = makeStyles({
  container: {
    width: "34vw",
    flex: 0.73,
    minWidth: 400
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginLeft: "13%",
    marginRight: "13%",
    marginTop: "15%",
    marginBottom: "15%"
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
