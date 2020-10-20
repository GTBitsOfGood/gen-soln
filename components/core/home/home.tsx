import React from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { signIn, signOut, useSession } from "next-auth/client";

import SimpleContainer from "@core/banner/Banner";
import { CoreButton } from "@core/buttons";
import CoreNavBar from "@core/navbar/CoreNavBar";
import CoreTypography from "@core/typography";
import config from "config";
import { getUpcomingEvents, getNearestEvents } from "requests/events";
import {
  DatePaginatedEventCards,
  LocationPaginatedEventCards
} from "utils/types";

import EventsPageEventList from "../../events/EventsPageEventList";

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
  mainContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    padding: "5%"
  },
  listContainer: {
    paddingTop: 24
  },
  nearestEventsContainer: {
    marginTop: 60
  }
});
interface Props {
  upcomingEvents: DatePaginatedEventCards;
}
const HomePage: React.FC<Props> = ({ upcomingEvents }) => {
  const [session] = useSession();

  const { container, text, button, mainContainer, listContainer } = useStyles();
  const events = upcomingEvents;
  return (
    <div className={container}>
      {console.log(upcomingEvents)}
      <CoreNavBar></CoreNavBar>
      <SimpleContainer></SimpleContainer>
      <div className={mainContainer}>
        {events && (
          <>
            <CoreTypography variant="h2">
              Upcoming Volunteer Events
            </CoreTypography>
            <div className={listContainer}>
              <EventsPageEventList
                paginatedEventCardsData={upcomingEvents}
                getMoreEvents={(page: number) =>
                  getUpcomingEvents({
                    page,
                    date: upcomingEvents.date,
                    totalCount: upcomingEvents.totalCount,
                    isLastPage: upcomingEvents.isLastPage
                  })
                }
              />
            </div>
          </>
        )}
      </div>

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
