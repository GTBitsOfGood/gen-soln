import React from "react";
import { NextPage } from "next";

import AuthPageLayout from "components/auth/AuthPageLayout";
import LoginFormContent from "components/auth/LoginFormContent";

const IndexPage: NextPage = () => {
  return (
    <AuthPageLayout>
      <LoginFormContent />
    </AuthPageLayout>
  );
};

export default IndexPage;
