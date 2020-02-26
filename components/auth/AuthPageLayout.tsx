import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import AuthPageHeader from "./AuthPageHeader";

import FullPageLayout from "components/FullPageLayout";

const useStyles = makeStyles(({ palette, margins }: Theme) =>
  createStyles({
    content: {
      display: "flex",
      flex: 0.6,
      paddingTop: margins.VERTICAL,
      paddingBottom: margins.VERTICAL
    },
    main: {
      position: "relative",
      display: "flex",
      minWidth: 486,
      flexDirection: "column",
      justifyContent: "center",
      marginLeft: margins.LEFT
    },
    placeholder: {
      flex: 0.4,
      backgroundColor: palette.background.imagePlaceholder
    }
  })
);

const AuthPageLayout: React.FC = ({ children }) => {
  const { content, main, placeholder } = useStyles();

  return (
    <FullPageLayout>
      <div className={content}>
        <div className={main}>
          <AuthPageHeader />
          {children}
        </div>
      </div>
      <div className={placeholder} />
    </FullPageLayout>
  );
};

export default AuthPageLayout;
