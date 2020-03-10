import React, { useState, useCallback } from "react";

import ButtonWithLowercaseText from "components/ButtonWithLowercaseText";
import AuthPageForm from "./AuthPageForm";
import LoginFormEmailField from "./LoginFormEmailField";
import LoginFormPasswordField from "./LoginFormPasswordField";

import { ContentComponentProps } from "./types";

const LoginFormContent: React.FC<ContentComponentProps> = ({
  navigateToContent
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(false);

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

  const onPressCTA = useCallback(async () => {
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
      <LoginFormEmailField
        email={email}
        onChangeEmail={onChangeEmail}
        hasError={hasError}
      />
      <LoginFormPasswordField
        password={password}
        onChangePassword={onChangePassword}
        hasError={hasError}
        hasErrorHelperText="Incorrect email or password"
      />
    </AuthPageForm>
  );
};

export default LoginFormContent;
