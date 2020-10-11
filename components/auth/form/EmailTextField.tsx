import React from "react";

import { TextField, InputAdornment } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

import { MailIcon } from "@core/icons";

export const EMAIL_INPUT_FIELD_NAME = "user_email";

const useStyles = makeStyles({
  verticalMargins: {
    margin: "5vh 0"
  }
});

interface Props {
  hasError: boolean;
  hasErrorHelperText?: string;
}

const EmailTextField: React.FC<Props> = ({
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
      type="email"
      placeholder="email@nonprofit.com"
      name={EMAIL_INPUT_FIELD_NAME}
      error={hasError}
      helperText={hasError ? hasErrorHelperText : ""}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MailIcon color="secondary" fontSize="inherit" />
          </InputAdornment>
        )
      }}
    />
  );
};

export default EmailTextField;
