import React, { useState, useCallback, useRef } from "react";

import Typography from "@material-ui/core/Typography";
import LoginFormEmailField, {
  EMAIL_INPUT_FIELD_NAME
} from "./LoginFormEmailField";

import AuthPageForm from "./AuthPageForm";

import { ContentComponentProps } from "./types";

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
  const [hasError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [currentState, setCurrentState] = useState<keyof typeof states>(
    "INITIAL"
  );

  const onClickGoBack = useCallback(() => {
    navigateToContent("login");
  }, [navigateToContent]);

  const onPressCTA = useCallback(
    async (stopLoading: () => void) => {
      switch (currentState) {
        case "INITIAL": {
          const data = new FormData(formRef.current ?? undefined);
          const email = data.get(EMAIL_INPUT_FIELD_NAME) as string;
          // TODO: await some async function that sends password recovery email to the user
          stopLoading();
          setCurrentState("FINAL");
          break;
        }
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
      <LoginFormEmailField
        hasError={hasError}
        hasErrorHelperText="Something went wrong, please try later."
      />
      <Typography>{states[currentState].caption}</Typography>
    </AuthPageForm>
  );
};

export default RecoverPasswordFormContent;
