import React, { useState, useCallback, useRef } from "react";

import Typography from "@material-ui/core/Typography";
import EmailTextField, { EMAIL_INPUT_FIELD_NAME } from "./EmailTextField";

import AuthPageForm from "./AuthPageForm";

import { ContentComponentProps } from "../types";

import { recoverPassword } from "requests/admin";
import errors from "utils/errors";

const states = {
  INITIAL: {
    caption: "Enter the email address associated with your account.",
    ctaText: "Get Password"
  },
  FINAL: {
    caption: "A new password has been sent to this email.",
    ctaText: "Back to Sign In"
  }
};

const RecoverPasswordFormContent: React.FC<ContentComponentProps> = ({
  navigateToContent
}) => {
  // TODO: Use this to show an error message below the email input field
  //const [hasError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState("");
  const [currentState, setCurrentState] = useState<keyof typeof states>(
    "INITIAL"
  );

  const onClickGoBack = useCallback(() => {
    navigateToContent("login");
  }, [navigateToContent]);

  const onPressCTA = useCallback(
    async (stopLoading: () => void) => {
      switch (currentState) {
        case "INITIAL":
          try {
            const data = new FormData(formRef.current ?? undefined);
            const email = data.get(EMAIL_INPUT_FIELD_NAME) as string;
            await recoverPassword(email);
            setCurrentState("FINAL");
          } catch (err) {
            let message;
            if (
              err instanceof Error &&
              err.message === errors.admin.INVALID_EMAIL_FOR_PASSWORD_RECOVERY
            ) {
              message = errors.admin.INVALID_EMAIL_FOR_PASSWORD_RECOVERY;
            }
            setError(message ?? errors.GENERIC_TEXT);
          } finally {
            stopLoading();
          }
          break;
        case "FINAL":
          onClickGoBack();
          break;
        default: {
          const _exhaustiveCheck: never = currentState;
          return _exhaustiveCheck;
        }
      }
    },
    [currentState, onClickGoBack]
  );

  return (
    <AuthPageForm
      ref={formRef}
      title="Recover Password"
      hasBackButton={currentState !== "FINAL"}
      onPressBackButton={onClickGoBack}
      ctaText={states[currentState].ctaText}
      onPressCTA={onPressCTA}
    >
      <EmailTextField hasError={Boolean(error)} hasErrorHelperText={error} />
      <Typography>{states[currentState].caption}</Typography>
    </AuthPageForm>
  );
};

export default RecoverPasswordFormContent;
