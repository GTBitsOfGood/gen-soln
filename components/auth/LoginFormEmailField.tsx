import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";

const useStyles = makeStyles({
  verticalMargins: {
    margin: "5vh 0"
  }
});

interface Props {
  email: string;
  onChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError: boolean;
  hasErrorHelperText?: string;
}

const LoginFormEmailField: React.FC<Props> = ({
  email,
  onChangeEmail,
  hasError,
  hasErrorHelperText = ""
}) => {
  const { verticalMargins } = useStyles();

  return (
    <TextField
      className={verticalMargins}
      required
      fullWidth
      variant="standard"
      color="secondary"
      type="email"
      placeholder="email@nonprofit.com"
      value={email}
      onChange={onChangeEmail}
      error={hasError}
      helperText={hasError ? hasErrorHelperText : ""}
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

export default LoginFormEmailField;
