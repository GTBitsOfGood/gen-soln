import React, { useState, useCallback, useMemo } from "react";

import { login } from "requests/admin";
import { useRouter } from "next/router";
import errors from "utils/errors";
import urls from "config";
// import cookie from "js-cookie";

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

  const hasError = useMemo(() => error !== "", [error]);

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
        // const  { token } = await login(email, password);
        // cookie.set("token", token, { expires: 1 });
        // Currently, it takes a long time to navigate and load the index page, so don't stop loading:
        router.push(urls.pages.index);
      } catch (err) {
        setError(
          err.message === errors.admin.INVALID_EMAIL ||
            err.message === errors.admin.INVALID_PASSWORD
            ? "Invalid email or password. Please try again."
            : "An unexpected error occurred. Please try again."
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
      title="Sign in"
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
        hasError={hasError}
      />
      <LoginFormPasswordField
        password={password}
        onChangePassword={onChangePassword}
        hasError={hasError}
        hasErrorHelperText={error}
      />
    </AuthPageForm>
  );
};

export default LoginFormContent;
