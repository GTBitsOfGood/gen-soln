import React from "react";

import Home from "../components/core/home/home";
import { getNonprofitsCardData } from "../server/actions/core";
import { NonprofitCardData, PaginatedNonprofitCards } from "../utils/types";

interface Props {
  nonprofitCards: PaginatedNonprofitCards;
}

const HomePage = (props: Props) => {
  const { nonprofitCards } = props;
  const { page, isLastPage, cards } = nonprofitCards;
  return <Home page={page} isLastPage={isLastPage} cards={cards} />;
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
  return { props: { nonprofitCards: cards } };
};
