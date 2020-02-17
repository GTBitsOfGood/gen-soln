import React, { useState, useCallback, SetStateAction, Dispatch } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  },
  form: {
    height: "75%",
    maxHeight: 360
  },
  formContent: {
    height: "60%"
  },
  formFooter: {
    height: "15%",
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
  const { form, container, formContent, formFooter, rightMargin } = useStyles();

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
    <div className={container}>
      <Typography variant="h5">{title}</Typography>
      <form className={form} onSubmit={handleSubmit}>
        <div className={formContent}>{children}</div>

        <Button
          fullWidth
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
    </div>
  );
};

export default AuthPageForm;
