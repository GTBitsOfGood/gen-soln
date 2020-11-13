import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { signIn, signOut, useSession } from "next-auth/client";

import { CoreButton } from "@core/buttons";
import LandingCarousel from "@core/home/LandingCarousel";
import config from "config";

import { PaginatedNonprofitCards } from "../../../utils/types";
import SupportCauseGrid from "./SupportCauseGrid";

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
  },
  carousel: {
    "align-self": "center"
  }
});

const Home = (nonprofitCards: PaginatedNonprofitCards) => {
  const [session] = useSession();
  const { container, text, button, carousel } = useStyles();
  const { page, isLastPage, cards } = nonprofitCards;

  return (
    <div className={container}>
      {!session && (
        <div className={text}>
          Not signed in <br />
          <CoreButton
            variant="contained"
            onClick={e => {
              e.preventDefault();
              signIn().catch(err => console.error(err));
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
              signOut().catch(err => console.error(err));
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
      <SupportCauseGrid />
      <div className={carousel}>
        <LandingCarousel page={page} isLastPage={isLastPage} cards={cards} />
      </div>
    </div>
  );
};

export default Home;
