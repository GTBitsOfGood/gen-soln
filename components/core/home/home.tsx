import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { signIn, signOut, useSession } from "next-auth/client";

import SimpleContainer from "@core/banner/Banner";
import { CoreButton } from "@core/buttons";
import CoreNavBar from "@core/navbar/CoreNavBar";
import config from "config";

const useStyles = makeStyles({
  container: {
    display: "flex",
    "min-width": "420px",
    flexDirection: "column",
    "align-self": "center"
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
  const [session] = useSession();

  const { container, text, button } = useStyles();

  return (
    <div className={container}>
      <CoreNavBar></CoreNavBar>
      <SimpleContainer></SimpleContainer>
      {!session && (
        <div className={text}>
          Not signed in <br />
          <CoreButton
            variant="contained"
            onClick={e => {
              e.preventDefault();
              signIn().catch(err => console.log(err));
            }}
            className={button}
          >
            Sign in
          </CoreButton>
        </div>
      )}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <CoreButton
            variant="contained"
            onClick={e => {
              e.preventDefault();
              signOut().catch(err => console.log(err));
            }}
            className={button}
          >
            Sign out
          </CoreButton>
        </>
      )}
      <CoreButton
        variant="contained"
        href={config.pages.signup}
        className={button}
      >
        Sign up
      </CoreButton>
    </div>
  );
};

export default HomePage;
