import React from "react";
import Typography from "@material-ui/core/Typography";
import HorizonButton from "components/core/HorizonButton";
import HorizonLink from "@horizon/HorizonLink";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import { EMAIL_INPUT_FIELD_NAME } from "../auth/form/EmailTextField";

const useStyles = makeStyles({
  container: {
    display: "flex",
    "min-width": "420px",
    flexDirection: "column",
    "align-self": "center",
    "margin-top": "10vh"
  },
  name_container: {
    width: "420px",
    display: "flex",
    flexDirection: "row",
    "align-self": "center"
  },
  title: {
    "text-align": "center",
    color: "#333333",
    margin: "5px 0px"
  },
  subtitle: {
    "text-align": "center",
    color: "#333333",
    margin: "5px 0px",
    "font-size": "22px",
    whiteSpace: "pre-line"
  },
  input_first_name: {
    width: "200x",
    margin: "20px 50px 20px 0px"
  },
  input_last_name: {
    width: "200x",
    margin: "20px 0px 20px"
  },
  input_long: {
    width: "420px",
    "align-self": "center",
    margin: "20px 14px"
  }
});

const SignUp = () => {
  const {
    container,
    title,
    subtitle,
    input_long,
    input_first_name,
    input_last_name,
    name_container
  } = useStyles();

  return (
    <div className={container}>
      <Typography className={title} variant="h1">
        Sign up for Bits of Good
      </Typography>
      <Typography className={subtitle} variant="h3">
        Join a community of people who are {"\n"} looking to do good.
      </Typography>
      <div className={name_container}>
        <TextField
          className={input_first_name}
          required
          variant="standard"
          type="name"
          placeholder="First Name"
          name="first_name"
        />
        <TextField
          className={input_last_name}
          required
          variant="standard"
          type="name"
          placeholder="Last Name"
          name="last_name"
        />
      </div>
      <TextField
        className={input_long}
        required
        variant="standard"
        type="email"
        placeholder="Your Email"
        name="user_email"
      />
      <TextField
        className={input_long}
        required
        variant="standard"
        type="password"
        placeholder="Password"
        name="user_password"
      />
    </div>
  );
};

export default SignUp;
