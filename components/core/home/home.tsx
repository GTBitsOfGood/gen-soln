import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import HorizonButton from "components/core/HorizonButton";
import makeStyles from "@material-ui/core/styles/makeStyles";
import config from "../../../config";

const useStyles = makeStyles({
  container: {
    display: "flex",
    "min-width": "420px",
    flexDirection: "column",
    "align-self": "center",
    "margin-top": "10vh"
  },
  text: {
    "text-align": "center",
    color: "#333333",
    margin: "5px 0px"
  },
  button: {
    width: "160px",
    "align-self": "center",
    margin: "20px 0px"
  }
});

const HomePage = () => {
  const [session, loading] = useSession();

  const { container, text, button } = useStyles();

  return (
    <div className={container}>
      {!session && (
        <div className={text}>
          Not signed in <br />
          <HorizonButton
            onClick={e => {
              e.preventDefault();
              signIn().catch(err => console.log(err));
            }}
            className={button}
          >
            Sign in
          </HorizonButton>
        </div>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <HorizonButton
            onClick={e => {
              e.preventDefault();
              signOut().catch(err => console.log(err));
            }}
            className={button}
          >
            Sign out
          </HorizonButton>
        </>
      )}
      <HorizonButton href={config.pages.signup} className={button}>
        {" "}
        Sign up
      </HorizonButton>
    </div>
  );
};

export default HomePage;
