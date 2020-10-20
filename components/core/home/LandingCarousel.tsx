import React from "react";

import { useRouter } from "next/router";

import CardPaginationList from "@core/list";
import config from "config";
import { PaginatedNonprofitCards } from "utils/types";

import NonprofitCard from "./NonprofitCard";
import NonprofitCardGlimmer from "./NonprofitCardGlimmer";

interface Props {
  paginatedNonprofitCardsData: PaginatedNonprofitCards;
  getMoreNonprofits: (newPage: number) => Promise<PaginatedNonprofitCards>;
}

const LandingCarousel = (props: Props) => {
  const { paginatedNonprofitCardsData, getMoreNonprofits } = props;
  const router = useRouter();
  return (
    <CardPaginationList
      paginatedCardsData={paginatedNonprofitCardsData}
      fetchCards={getMoreNonprofits}
      cardGlimmer={<NonprofitCardGlimmer />}
      renderCard={cardData => (
        <NonprofitCard
          nonprofitCardData={cardData}
          onClick={() => {
            void router.push(
              config.pages.non_profit(),
              config.pages.non_profit(cardData._id)
            );
          }}
        />
      )}
    />
  );
};

export default LandingCarousel;
