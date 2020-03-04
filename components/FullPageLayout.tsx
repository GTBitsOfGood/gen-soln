import React from "react";
import clsx from "clsx";

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

const FullPageLayout: React.FC<Props> = ({ children, className }) => {
  const { container } = useStyles();

  return <div className={clsx(container, className)}>{children}</div>;
};

export default FullPageLayout;
