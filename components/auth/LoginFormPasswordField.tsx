import React, { useState, useCallback } from "react";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

interface Props {
  password: string;
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError: boolean;
  hasErrorHelperText: string;
}

const LoginFormPasswordField: React.FC<Props> = ({
  password,
  onChangePassword,
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
      color="secondary"
      placeholder="Enter password"
      value={password}
      onChange={onChangePassword}
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
