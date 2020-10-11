import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import FullPageLayout from "components/FullPageLayout";

import AuthPageHeader from "./AuthPageHeader";

const useStyles = makeStyles(({ margins }: Theme) =>
  createStyles({
    container: {
      padding: `${margins.VERTICAL} ${margins.HORIZONTAL}`,
      justifyContent: "space-between"
    },
    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    placeholder: {
      height: "68vh",
      width: "auto",
      alignSelf: "center"
    }
  })
);

const AuthPageLayout: React.FC = ({ children }) => {
  const { container, content, placeholder } = useStyles();

  return (
    <FullPageLayout className={container}>
      <div className={content}>
        <AuthPageHeader />
        {children}
      </div>
      <img
        className={placeholder}
        alt="Login Page Background"
        src="/site/login.png"
      />
    </FullPageLayout>
  );
};

export default AuthPageLayout;
