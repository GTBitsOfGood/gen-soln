import React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import BrandingHeader from "components/BrandingHeader";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    container: {
      height: "100vh",
      width: "100vw",
      display: "flex"
    },
    content: {
      display: "flex",
      flex: 0.6,
      justifyContent: "center",
      paddingTop: "5vh",
      paddingBottom: "5vh"
    },
    main: {
      position: "relative",
      display: "flex",
      flex: 0.8,
      flexDirection: "column",
      justifyContent: "center"
    },
    placeholder: {
      flex: 0.4,
      backgroundColor: palette.background.placeholder
    }
  })
);

const AuthPageLayout: React.FC = ({ children }) => {
  const { container, content, main, placeholder } = useStyles();

  return (
    <div className={container}>
      <div className={content}>
        <div className={main}>
          <BrandingHeader />
          {children}
        </div>
      </div>
      <div className={placeholder} />
    </div>
  );
};

export default AuthPageLayout;
