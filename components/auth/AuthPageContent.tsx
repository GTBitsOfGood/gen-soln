import React, { useState, useCallback, useMemo } from "react";

import dynamic, { DynamicOptions } from "next/dynamic";

import { Content, ContentComponentProps } from "components/auth";

import AuthPageFormContainer from "./form/AuthPageFormContainer";

const options: DynamicOptions<ContentComponentProps> = {
  loading: () => <AuthPageFormContainer />,
  ssr: false
};

const contentComponents: Record<
  Content,
  React.ComponentType<ContentComponentProps>
> = {
  login: dynamic<ContentComponentProps>(
    () => import("./form/LoginFormContent"),
    options
  ),
  forgotPassword: dynamic<ContentComponentProps>(
    () => import("./form/RecoverPasswordFormContent"),
    options
  )
};

const AuthPageContent: React.FC = () => {
  const [activeContent, setActiveContent] = useState<Content>("login");

  const navigateToContent = useCallback(
    (content: Content) => {
      setActiveContent(content);
    },
    [setActiveContent]
  );

  const Component = useMemo(() => contentComponents[activeContent], [
    activeContent
  ]);

  return <Component navigateToContent={navigateToContent} />;
};

export default AuthPageContent;
