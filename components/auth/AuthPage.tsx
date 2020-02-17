import React, { useState, useCallback, useMemo } from "react";
import dynamic, { DynamicOptions } from "next/dynamic";

import AuthPageLayout from "./AuthPageLayout";
import AuthPageFormContainer from "./AuthPageFormContainer";
import { Content, ContentComponentProps } from "./types";

const options: DynamicOptions<ContentComponentProps> = {
  loading: () => <AuthPageFormContainer />,
  ssr: false
};

const contentComponents: Record<
  Content,
  React.ComponentType<ContentComponentProps> | null
> = {
  login: dynamic<ContentComponentProps>(
    () => import("./LoginFormContent"),
    options
  ),
  forgotPassword: null,
  chooseService: null,
  signup: null
};

const AuthPage: React.FC = () => {
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

  return (
    <AuthPageLayout>
      {Component && <Component navigateToContent={navigateToContent} />}
    </AuthPageLayout>
  );
};

export default AuthPage;
