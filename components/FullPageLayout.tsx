import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import clsx from "clsx";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex"
  }
});

interface Props {
  className?: string;
}

const FullPageLayout: React.FC<Props> = ({ children, className }) => {
  const { container } = useStyles();

  return <div className={clsx(container, className)}>{children}</div>;
};

export default FullPageLayout;
