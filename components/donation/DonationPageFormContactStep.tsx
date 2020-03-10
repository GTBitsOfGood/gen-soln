import React from "react";
import clsx from "clsx";
import makeStyles from "@material-ui/core/styles/makeStyles";

import TextField from "@material-ui/core/TextField";

import { ContentComponentProps } from "./types";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  name: {
    display: "flex",
    justifyContent: "space-between"
  },
  rightMargin: {
    marginRight: 24
  },
  verticalPositiveMargin: {
    marginTop: 14,
    marginBottom: 14
  },
  verticalNegativeMargin: {
    marginTop: -14,
    marginBottom: -14
  }
});

const DonationPageFormContactStep: React.FC<ContentComponentProps> = () => {
  const {
    container,
    name,
    rightMargin,
    verticalNegativeMargin,
    verticalPositiveMargin
  } = useStyles();

  return (
    <div className={clsx(container, verticalNegativeMargin)}>
      <div className={clsx(name, verticalPositiveMargin)}>
        <TextField
          className={rightMargin}
          fullWidth
          required
          label="First Name"
        />
        <TextField fullWidth required label="Last Name" />
      </div>
      <TextField
        required
        fullWidth
        type="email"
        label="Email"
        placeholder="email@nonprofit.com"
        className={verticalPositiveMargin}
      />
    </div>
  );
};

export default DonationPageFormContactStep;
