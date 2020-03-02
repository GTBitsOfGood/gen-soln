import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

const white = "white";
const useStyles = makeStyles({
  container: {
    backgroundColor: white,
    borderRadius: 8,
    boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  }
});

interface Props {
  className?: string;
}

const ContainerWithShadow: React.FC<Props> = ({ children, className = "" }) => {
  const { container } = useStyles();

  return <div className={`${container} ${className}`.trim()}>{children}</div>;
};

export default ContainerWithShadow;
