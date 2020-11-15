import React from "react";

import { Typography } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { signIn, signOut, useSession } from "next-auth/client";

import SimpleContainer from "@core/banner/Banner";
import { CoreButton } from "@core/buttons";
import FixedContainer from "@core/footer";
import LandingCarousel from "@core/home/LandingCarousel";
import CoreLink from "@core/link";
import CoreNavBar from "@core/navbar/CoreNavBar";
import config from "config";
import { getUpcomingEvents, getNearestEvents } from "requests/events";
import {
  DatePaginatedEventCards,
  LocationPaginatedEventCards
} from "utils/types";

import { PaginatedNonprofitCards } from "../../../utils/types";
import EventsPageEventList from "../../events/EventsPageEventList";
import SupportCauseGrid from "./SupportCauseGrid";

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
  },
  carousel: {
    "align-self": "center",
    "margin-bottom": 10
  },
  heading: {
    align: "left",
    "margin-left": 48,
    "margin-top": 200,
    "margin-bottom": 25,
    color: "#333333"
  },
  allLink: {
    "margin-top": 20,
    float: "right"
  }
});

const Home = (nonprofitCards: PaginatedNonprofitCards) => {
  const [session] = useSession();
  const { container, text, button, carousel, heading, allLink } = useStyles();
  const { page, isLastPage, cards } = nonprofitCards;

  return (
    <div className={container}>
      <CoreNavBar></CoreNavBar>
      <SimpleContainer></SimpleContainer>
      <SupportCauseGrid />
      <div className={carousel}>
        <Typography className={heading} variant="h2">
          New Non-Profits on Our Platform
        </Typography>
        <LandingCarousel page={page} isLastPage={isLastPage} cards={cards} />
        <CoreLink href={"/"} className={allLink}>
          {"All Non-Profits Here ->"}
        </CoreLink>
      </div>
      <FixedContainer></FixedContainer>
    </div>
  );
};

export default Home;
