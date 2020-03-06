import React, { useState, useCallback, SetStateAction, Dispatch } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import AuthPageFormContainer from "./AuthPageFormContainer";
import ButtonWithNonProfitColor from "components/ButtonWithNonProfitColor";

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
  const {
    form,
    formContent,
    formFooter,
    rightMargin,
    formFooterContainer
  } = useStyles();

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
      <Typography variant="h4">{title}</Typography>
      <form className={form} onSubmit={handleSubmit}>
        <div className={formContent}>{children}</div>
        <div className={formFooterContainer}>
          <div className={formFooter}>
            <ButtonWithNonProfitColor type="submit" disabled={isSubmitting}>
              {isSubmitting && (
                <CircularProgress
                  className={rightMargin}
                  color="inherit"
                  size={16}
                />
              )}
              {ctaText}
            </ButtonWithNonProfitColor>
            {footer}
          </div>
        </div>
      </form>
    </AuthPageFormContainer>
  );
};

export default AuthPageForm;
