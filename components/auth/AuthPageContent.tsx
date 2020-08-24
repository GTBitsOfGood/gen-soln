import React, { useState, useCallback, useMemo } from "react";
import dynamic, { DynamicOptions } from "next/dynamic";

import AuthPageFormContainer from "./AuthPageFormContainer";
import { Content, ContentComponentProps } from "./types";

const options: DynamicOptions<ContentComponentProps> = {
  loading: () => <AuthPageFormContainer />,
  ssr: false
};

const contentComponents: Record<
  Content,
  React.ComponentType<ContentComponentProps>
> = {
  login: dynamic<ContentComponentProps>(
    () => import("./LoginFormContent"),
    options
  ),
  forgotPassword: dynamic<ContentComponentProps>(
    () => import("./RecoverPasswordFormContent"),
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
