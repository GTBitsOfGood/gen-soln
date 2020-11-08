import React from "react";

import Home from "../components/core/home/home";
import { getNonprofitsCardData } from "../server/actions/core";
import { NonprofitCardData, PaginatedNonprofitCards } from "../utils/types";

interface Props {
  nonprofitCards: PaginatedNonprofitCards;
}

const HomePage = (props: Props) => {
  const { nonprofitCards } = props;
  const { page, totalCount, isLastPage, cards } = nonprofitCards;
  return (
    <Home
      page={page}
      totalCount={totalCount}
      isLastPage={isLastPage}
      cards={cards}
    />
  );
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
      console.log(res);
      return res;
    })
    .catch(e => {
      console.log(e);
      return {
        cards: [],
        page: 0,
        totalCount: 0,
        isLastPage: true
      };
    });
  console.log(cards);
  return { props: { nonprofitCards: cards } };
};
