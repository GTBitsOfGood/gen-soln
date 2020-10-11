import React from "react";

import AuthPageContent from "./AuthPageContent";
import AuthPageLayout from "./AuthPageLayout";

const AuthPage: React.FC = () => {
  return (
    <AuthPageLayout>
      <AuthPageContent />
    </AuthPageLayout>
  );
};

export default AuthPage;
