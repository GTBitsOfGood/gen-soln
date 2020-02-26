import React, { useState, useCallback, SetStateAction, Dispatch } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import AuthPageFormContainer from "./AuthPageFormContainer";
import ButtonWithCTA from "components/ButtonWithCTA";

const useStyles = makeStyles({
  form: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    maxHeight: 360
  },
  formContent: {
    flex: 0.8
  },
  formFooter: {
    marginTop: 8,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center"
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
  const { form, formContent, formFooter, rightMargin } = useStyles();

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

        <ButtonWithCTA fullWidth type="submit" disabled={isSubmitting}>
          {isSubmitting && (
            <CircularProgress
              className={rightMargin}
              color="inherit"
              size={16}
            />
          )}
          {ctaText}
        </ButtonWithCTA>

        <div className={formFooter}>{footer}</div>
      </form>
    </AuthPageFormContainer>
  );
};

export default AuthPageForm;
