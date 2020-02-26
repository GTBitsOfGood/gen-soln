import React, { useState, useCallback } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Typography from "@material-ui/core/Typography";

import AuthPageForm from "./AuthPageForm";

import { ContentComponentProps } from "./types";

const useStyles = makeStyles({
  topMargin: {
    marginTop: 40
  }
});

const useStyles2 = makeStyles({
  assistanceText: {
    marginTop: 20
  }
});

const PasswordAssistanceFormContent: React.FC<ContentComponentProps> = ({
  navigateToContent
}) => {
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState(false);
  const [onPressGetPassword, setOnPressGetPassword] = useState(
    "Enter the email address associated with your Donation Marketplace Solution account."
  );
  const [ctaText, setCtaText] = useState("Get Password");

  const { topMargin } = useStyles();

  const { assistanceText } = useStyles2();

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const onPressCTA = useCallback(() => {
    setOnPressGetPassword("We have sent a new password to this email.");
    setCtaText("Back to Sign In");
  }, []);

  const onClickGoBack = useCallback(() => {
    navigateToContent("login");
  }, [navigateToContent]);

  return (
    <>
      <div>
        <Button
          disableRipple
          color="secondary"
          startIcon={<ArrowBackIosIcon />}
          onClick={onClickGoBack}
        >
          Back
        </Button>
      </div>
      <AuthPageForm
        title="Password Assistance"
        ctaText={ctaText}
        onPressCTA={onPressCTA}
        setHasError={setHasError}
      >
        <TextField
          className={topMargin}
          required
          fullWidth
          color="secondary"
          type="email"
          placeholder="email@nonprofit.com"
          value={email}
          onChange={onChangeEmail}
          error={hasError}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailOutlinedIcon color="secondary" />
              </InputAdornment>
            )
          }}
        />
        <Typography className={assistanceText}>{onPressGetPassword}</Typography>
      </AuthPageForm>
    </>
  );
};

export default PasswordAssistanceFormContent;
