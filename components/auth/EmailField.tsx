import React, { useState, useCallback } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";

const useStyles = makeStyles({
  topMargin: {
    marginTop: 40
  }
});

interface Props {
  email: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError: boolean;
}

const EmailField: React.FC<Props> = ({ email, onChangeEmail, hasError }) => {
  const { topMargin } = useStyles();
  return (
    <TextField
      className={topMargin}
      required
      fullWidth
      color="secondary"
      type="email"
      placeholder="email@nonprofit.com"
      value={email}
      onChange={onChangeEmail}
      error={hasError}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <EmailOutlinedIcon color="secondary" />
          </InputAdornment>
        )
      }}
    />
  );
};

export default EmailField;
