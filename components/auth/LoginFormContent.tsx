import React, { useState, useCallback } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import ButtonWithLowercaseText from "components/ButtonWithLowercaseText";
import AuthPageForm from "./AuthPageForm";

import { ContentComponentProps } from "./types";

const useStyles = makeStyles({
  topMargin: {
    marginTop: 40
  }
});

const LoginFormContent: React.FC<ContentComponentProps> = ({
  navigateToContent
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const { topMargin } = useStyles();

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const onPressCTA = useCallback(() => {
    // TODO: Code for signing-in
  }, []);

  const onClickForgotPassword = useCallback(() => {
    navigateToContent("forgotPassword");
    // TODO: Code for forgot password
  }, [navigateToContent]);

  return (
    <AuthPageForm
      title="SIGN IN"
      ctaText="SIGN IN"
      onPressCTA={onPressCTA}
      setHasError={setHasError}
      footer={
        <ButtonWithLowercaseText
          disableRipple
          color="secondary"
          onClick={onClickForgotPassword}
        >
          Forgot password?
        </ButtonWithLowercaseText>
      }
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
      <TextField
        className={topMargin}
        required
        fullWidth
        color="secondary"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={onChangePassword}
        error={hasError}
        helperText={hasError ? "Incorrect email or password" : ""}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlinedIcon color="secondary" />
            </InputAdornment>
          )
        }}
      />
    </AuthPageForm>
  );
};

export default LoginFormContent;
