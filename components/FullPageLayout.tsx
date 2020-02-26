import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex"
  }
});

interface Props {
  className?: string;
}

const FullPageLayout: React.FC<Props> = ({ children, className = "" }) => {
  const { container } = useStyles();

  return <div className={`${container} ${className}`.trim()}>{children}</div>;
};

export default FullPageLayout;
