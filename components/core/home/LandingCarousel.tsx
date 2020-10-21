import React from "react";

import CardPaginationList from "@core/list";
import config from "config";
import { PaginatedNonprofitCards } from "utils/types";

import { getNonProfitsByDate } from "../../../requests/core";
import NonprofitCard from "./NonprofitCard";
import NonprofitCardGlimmer from "./NonprofitCardGlimmer";

const LandingCarousel = () => {
  const cur_date = { date: "date_string" }; // need to know the format on backend

  let Non_Profit_Cards: PaginatedNonprofitCards = {
    cards: [],
    page: 0,
    totalCount: 0,
    isLastPage: true
  };
  const fetchNonprofitCards = async () => {
    await getNonProfitsByDate(cur_date)
      .then(res => (Non_Profit_Cards = res))
      .catch(e => console.log(e));
  };
  void fetchNonprofitCards();

  return (
    <CardPaginationList
      paginatedCardsData={Non_Profit_Cards}
      cardGlimmer={<NonprofitCardGlimmer />}
      renderCard={cardData => (
        <NonprofitCard
          nonprofitCardData={cardData}
          onClick={() => {
            config.pages.non_profit(cardData._id);
          }}
        />
      )}
    />
  );
};

export default LandingCarousel;
