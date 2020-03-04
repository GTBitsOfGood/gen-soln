import React, { useState, useCallback } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";

import ButtonWithLowercaseText from "components/ButtonWithLowercaseText";
import AuthPageForm from "./AuthPageForm";
import LoginFormPasswordField from "./LoginFormPasswordField";

import { ContentComponentProps } from "./types";

const useStyles = makeStyles({
  verticalMargins: {
    marginTop: 40,
    marginBottom: 40
  }
});

const LoginFormContent: React.FC<ContentComponentProps> = ({
  navigateToContent
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

  const { verticalMargins } = useStyles();

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
      title="Sign in"
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
        className={verticalMargins}
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
      <LoginFormPasswordField
        password={password}
        onChangePassword={onChangePassword}
        hasError={hasError}
      />
    </AuthPageForm>
  );
};

export default LoginFormContent;
