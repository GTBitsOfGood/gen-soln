import React from "react";
import { getUpcomingEventsCardData } from "server/actions/events";

import Home from "../components/core/home/home";
import { getNonprofitsCardData } from "../server/actions/core";
import { DatePaginatedEventCards, NonprofitCardData, PaginatedNonprofitCards } from "../utils/types";

interface Props {
  nonprofitCards: PaginatedNonprofitCards;
  upcomingEvents: DatePaginatedEventCards;
}

const HomePage = (props: Props) => {
  return <Home nonprofitCards={props.nonprofitCards} upcomingEvents={props.upcomingEvents} />;
};

export default HomePage;

export const getServerSideProps: () => Promise<{
  props: {
    nonprofitCards:
    | PaginatedNonprofitCards
    | {
      cards: NonprofitCardData[];
      isLastPage: boolean;
      page: number;
      totalCount: number;
    };
  };
}> = async () => {
  const cards = await getNonprofitsCardData()
    .then(res => {
      return res;
    })
    .catch(e => {
      // eslint-disable-next-line no-console
      console.log(e);
      return {
        cards: [],
        page: 0,
        totalCount: 0,
        isLastPage: true
      };
    });

  const date = new Date();
  const upcomingEvents = await getUpcomingEventsCardData({
    date: date.toJSON(),
    page: 0,
  });

  return {
    props: {
      nonprofitCards: cards,
      upcomingEvents
    }
  };
};
