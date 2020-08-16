import React, { useState, useCallback } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import AuthPageFormContainer from "./AuthPageFormContainer";

const useStyles = makeStyles({
  form: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    maxHeight: 360
  },
  formContent: {
    flex: 1
  },
  formFooter: {
    display: "flex",
    justifyContent: "space-between"
  },
  formFooterContainer: {
    flex: 0.2
  },
  rightMargin: {
    marginRight: 8
  }
});

interface Props {
  title: string;
  ctaText: string;
  onPressCTA: (stopLoading: () => void) => Promise<void>;
  footer?: React.ReactNode;
}

const AuthPageForm: React.FC<
  Props & React.ComponentProps<typeof AuthPageFormContainer>
> = ({ children, title, onPressCTA, ctaText, footer, ...rest }) => {
  const {
    form,
    formContent,
    formFooter,
    rightMargin,
    formFooterContainer
  } = useStyles();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const stopLoading = useCallback(() => {
    setIsSubmitting(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      // Let onPressCTA control when to stop loading
      await onPressCTA(stopLoading);
    },
    [onPressCTA, stopLoading]
  );

  return (
    <AuthPageFormContainer {...rest}>
      <Typography variant="h4">{title}</Typography>
      <form className={form} onSubmit={handleSubmit}>
        <div className={formContent}>{children}</div>
        <div className={formFooterContainer}>
          <div className={formFooter}>
            <Button
              color="primary"
              variant="contained"
              type="submit"
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
            {footer}
          </div>
        </div>
      </form>
    </AuthPageFormContainer>
  );
};

export default AuthPageForm;
