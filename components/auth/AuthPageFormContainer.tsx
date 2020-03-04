import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import ContainerWithShadow from "components/ContainerWithShadow";

const useStyles = makeStyles({
  container: {
    width: "34vw",
    flex: 0.66,
    minWidth: 400
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "9%",
    marginBottom: "9%"
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
