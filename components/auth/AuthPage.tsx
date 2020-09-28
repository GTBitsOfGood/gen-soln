import React from "react";

import AuthPageLayout from "./AuthPageLayout";
import AuthPageContent from "./AuthPageContent";

const AuthPage: React.FC = () => {
  return (
    <AuthPageLayout>
      <AuthPageContent />
    </AuthPageLayout>
  );
};

export default AuthPage;
