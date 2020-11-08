import React from "react";

import CardPaginationList from "@core/list";
import config from "config";
import { PaginatedNonprofitCards } from "utils/types";

import NonprofitCard from "./NonprofitCard";
import NonprofitCardGlimmer from "./NonprofitCardGlimmer";

const LandingCarousel = (nonprofitCardData: PaginatedNonprofitCards) => {
  return (
    <CardPaginationList
      paginatedCardsData={nonprofitCardData}
      cardGlimmer={<NonprofitCardGlimmer />}
      renderCard={cardData => (
        <NonprofitCard
          nonprofitCardData={cardData}
          onClick={() => {
            config.pages.nonprofit(cardData._id);
          }}
        />
      )}
    />
  );
};

export default LandingCarousel;
