import React from "react";
import Typography from "@material-ui/core/Typography";
import HorizonButton from "components/core/HorizonButton";
import HorizonLink from "@horizon/HorizonLink";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  container: {
    display: "flex"
  },
  text: {
    "text-align": "center",
    color: "#333333"
  }
});

const SignUp = () => {
  const { text } = useStyles();

  return (
    <div>
      <Typography className={text} variant="h1">
        Sign up for Bits of Good
      </Typography>
      <Typography className={text} variant="h3">
        Join a community of people who are looking to do good.
      </Typography>
    </div>
  );
};

export default SignUp;
