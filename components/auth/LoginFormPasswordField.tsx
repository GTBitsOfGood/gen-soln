import React, { useState, useCallback } from "react";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

export const PASSWORD_INPUT_FIELD_NAME = "user_password";

interface Props {
  hasError: boolean;
  hasErrorHelperText: string;
}

const LoginFormPasswordField: React.FC<Props> = ({
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
            <LockOutlinedIcon color="secondary" />
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export default LoginFormPasswordField;
