import React, { useState, useCallback, SetStateAction, Dispatch } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import AuthPageFormContainer from "./AuthPageFormContainer";

const useStyles = makeStyles({
  formFooter: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  rightMargin: {
    marginRight: 8
  },
  topMargin: {
    marginTop: 50
  }
});

interface Props {
  title: string;
  ctaText: string;
  onPressCTA: () => void;
  setHasError: Dispatch<SetStateAction<boolean>>;
  footer?: React.ReactNode;
}

const AuthPageForm: React.FC<Props> = ({
  children,
  title,
  onPressCTA,
  setHasError,
  ctaText,
  footer
}) => {
  const { formFooter, rightMargin, topMargin } = useStyles();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        setIsSubmitting(true);
        setHasError(false);
        onPressCTA();
      } catch (_) {
        setHasError(true);
      } finally {
        setIsSubmitting(false);
      }
    },
    [onPressCTA, setHasError]
  );

  return (
    <AuthPageFormContainer>
      <Typography variant="h5">{title}</Typography>
      <form onSubmit={handleSubmit}>
        <div>{children}</div>

        <Button
          fullWidth
          className={topMargin}
          type="submit"
          color="primary"
          variant="contained"
          disabled={isSubmitting}
        >
          {isSubmitting && (
            <CircularProgress
              className={rightMargin}
              color="inherit"
              size={16}
            />
          )}
          {ctaText}
        </Button>

        <div className={formFooter}>{footer}</div>
      </form>
    </AuthPageFormContainer>
  );
};

export default AuthPageForm;
