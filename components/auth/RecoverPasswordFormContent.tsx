import React, { useState, useCallback } from "react";

import Typography from "@material-ui/core/Typography";
import LoginFormEmailField from "./LoginFormEmailField";

import AuthPageForm from "./AuthPageForm";

import { ContentComponentProps } from "./types";

const states = {
  INITIAL: {
    caption:
      "Enter the email address associated with your Donation Marketplace Solution account.",
    ctaText: "Get Password"
  },
  FINAL: {
    caption: "We have sent a new password to this email.",
    ctaText: "Back to Sign In"
  }
};

const RecoverPasswordFormContent: React.FC<ContentComponentProps> = ({
  navigateToContent
}) => {
  const [email, setEmail] = useState("");
  const [hasError, setHasError] = useState(false);
  const [currentState, setCurrentState] = useState<keyof typeof states>(
    "INITIAL"
  );

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const onClickGoBack = useCallback(() => {
    navigateToContent("login");
  }, [navigateToContent]);

  const onPressCTA = useCallback(async () => {
    switch (currentState) {
      case "INITIAL":
        // TODO: await some async function that sends password recovery email to the user
        setCurrentState("FINAL");
        break;
      case "FINAL":
        onClickGoBack();
        break;
      default: {
        const _exhaustiveCheck: never = currentState;
        return _exhaustiveCheck;
      }
    }
  }, [currentState, onClickGoBack]);

  return (
    <AuthPageForm
      title="Recover Password"
      hasBackButton={currentState !== "FINAL"}
      onPressBackButton={onClickGoBack}
      ctaText={states[currentState].ctaText}
      onPressCTA={onPressCTA}
      setHasError={setHasError}
    >
      <LoginFormEmailField
        email={email}
        onChangeEmail={onChangeEmail}
        hasError={hasError}
        hasErrorHelperText="Something went wrong, please try later."
      />
      <Typography>{states[currentState].caption}</Typography>
    </AuthPageForm>
  );
};

export default RecoverPasswordFormContent;
