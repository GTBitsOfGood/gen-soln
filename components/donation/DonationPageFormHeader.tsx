import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#837AD7",
    padding: 12,
    maxHeight: 100
  },
  circle: {
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#403B70",
    borderRadius: "50%",
    backgroundColor: "#CBE3DB",
    height: 72,
    width: 72
  },
  text: {
    color: "white",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    flex: 1
  },
  horizontalPositiveMargin: {
    marginLeft: 8,
    marginRight: 8
  },
  horizontalNegativeMargin: {
    marginLeft: -8,
    marginRight: -8
  }
});

const DonationPageFormHeader: React.FC = () => {
  const {
    container,
    circle,
    text,
    horizontalPositiveMargin,
    horizontalNegativeMargin
  } = useStyles();

  return (
    <div className={`${container} ${horizontalNegativeMargin}`}>
      <div className={horizontalPositiveMargin}>
        <div className={circle} />
      </div>
      <Typography
        variant="h6"
        className={`${text} ${horizontalPositiveMargin}`}
      >
        Lorem ipsum dolor sit amet
      </Typography>
    </div>
  );
};

export default DonationPageFormHeader;
