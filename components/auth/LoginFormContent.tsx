import React, { useState, useCallback } from "react";

import { login } from "requests/admin";
import { useRouter } from "next/router";
import errors from "utils/errors";
import urls from "config";

import ButtonWithLowercaseText from "components/ButtonWithLowercaseText";
import AuthPageForm from "./AuthPageForm";
import LoginFormEmailField from "./LoginFormEmailField";
import LoginFormPasswordField from "./LoginFormPasswordField";

import { ContentComponentProps } from "./types";

const LoginFormContent: React.FC<ContentComponentProps> = ({
  navigateToContent
}) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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

  const onPressCTA = useCallback(
    async (stopLoading: () => void) => {
      try {
        await login(email, password);
        // Currently, it takes a long time to navigate and load the index page, so don't stop loading:
        router.push(urls.pages.index);
      } catch (err) {
        setError(
          err.message === errors.admin.INVALID_EMAIL ||
            err.message === errors.admin.INVALID_PASSWORD
            ? "Incorrect email or password."
            : "An unexpected error occurred."
        );
        stopLoading();
      }
    },
    [email, password, router]
  );

  const onClickForgotPassword = useCallback(() => {
    navigateToContent("forgotPassword");
  }, [navigateToContent]);

  return (
    <AuthPageForm
      title="Sign In"
      ctaText="SIGN IN"
      onPressCTA={onPressCTA}
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
        hasError={Boolean(error)}
      />
      <LoginFormPasswordField
        password={password}
        onChangePassword={onChangePassword}
        hasError={Boolean(error)}
        hasErrorHelperText={error}
      />
    </AuthPageForm>
  );
};

export default LoginFormContent;
