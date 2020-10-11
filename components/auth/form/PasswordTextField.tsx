import React, { useState, useCallback } from "react";

import { IconButton, InputAdornment, TextField } from "@material-ui/core";

import { EyeIcon, EyeClosedIcon, LockIcon } from "@core/icons";

export const PASSWORD_INPUT_FIELD_NAME = "user_password";

interface Props {
  hasError: boolean;
  hasErrorHelperText: string;
}

const PasswordTextField: React.FC<Props> = ({
  hasError,
  hasErrorHelperText
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  return (
    <TextField
      required
      fullWidth
      variant="standard"
      placeholder="Enter password"
      name={PASSWORD_INPUT_FIELD_NAME}
      error={hasError}
      type={showPassword ? "text" : "password"}
      helperText={hasError ? hasErrorHelperText : ""}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LockIcon color="secondary" fontSize="inherit" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default PasswordTextField;
