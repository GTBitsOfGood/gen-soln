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
  },
  assistanceText: {
    marginTop: 20
  }
});

const PasswordAssistanceCaption =
  "Enter the email address associated with your Donation Marketplace Solution account.";
const PasswordAssistanceCaption2 = "We have sent a new password to this email.";
const ForgetPasswordCTAText = "Back to Sign In";

const PasswordAssistanceFormContent: React.FC<ContentComponentProps> = ({
  navigateToContent
}) => {
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState(false);
  const [onPressGetPassword, setOnPressGetPassword] = useState(
    PasswordAssistanceCaption
  );

  const [ctaText, setCtaText] = useState("Get Password");

  const { topMargin, assistanceText } = useStyles();

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const onClickGoBack = useCallback(() => {
    navigateToContent("login");
  }, [navigateToContent]);

  const onPressCTA = useCallback(() => {
    //debugger;
    setOnPressGetPassword(PasswordAssistanceCaption2);
    setCtaText(ForgetPasswordCTAText);
    if (ctaText === ForgetPasswordCTAText) {
      onClickGoBack();
    }
  }, [ctaText, onClickGoBack]);

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
