import React, { useState, useCallback, useMemo } from "react";
import dynamic, { DynamicOptions } from "next/dynamic";

import AuthPageLayout from "./AuthPageLayout";
import AuthPageFormContainer from "./AuthPageFormContainer";
import { Content, ContentComponent } from "./types";

const options: DynamicOptions<ContentComponent> = {
  loading: () => <AuthPageFormContainer />,
  ssr: false
};

const contentComponents: Record<
  Content,
  React.ComponentType<ContentComponent> | null
> = {
  login: dynamic<ContentComponent>(() => import("./LoginFormContent"), options),
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
