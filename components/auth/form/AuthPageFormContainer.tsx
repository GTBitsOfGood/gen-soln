import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import ContainerWithShadow from "components/ContainerWithShadow";

import Button from "@material-ui/core/Button";

import { ChevronLeftIcon } from "@core/icons";

const useStyles = makeStyles({
  container: {
    width: "34vw",
    height: "52vh",
    minWidth: 360,
    minHeight: 250
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    margin: "5vh 5.5vh"
  },
  backButtonContainer: {
    minHeight: 36
  }
});

interface Props {
  hasBackButton?: boolean;
  onPressBackButton?: () => void;
}

const AuthPageFormContainer: React.FC<Props> = ({
  children,
  hasBackButton = false,
  onPressBackButton
}) => {
  const { container, contentContainer, backButtonContainer } = useStyles();

  return (
    <>
      <div className={backButtonContainer}>
        {hasBackButton && (
          <Button
            disableRipple
            color="secondary"
            startIcon={<ChevronLeftIcon />}
            onClick={onPressBackButton}
          >
            Back
          </Button>
        )}
      </div>

      <ContainerWithShadow className={container}>
        <div className={contentContainer}>{children}</div>
      </ContainerWithShadow>
    </>
  );
};

export default AuthPageFormContainer;
