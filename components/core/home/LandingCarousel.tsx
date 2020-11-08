import React from "react";

import CardPaginationList from "@core/list";
import config from "config";
import { NonprofitCardData, PaginatedNonprofitCards } from "utils/types";

import NonprofitCard from "./NonprofitCard";
import NonprofitCardGlimmer from "./NonprofitCardGlimmer";

const LandingCarousel = (nonprofitCardData: PaginatedNonprofitCards) => {
  return (
    <CardPaginationList
      paginatedCardsData={nonprofitCardData}
      cardGlimmer={<NonprofitCardGlimmer />}
      renderCard={(cardData: NonprofitCardData) => (
        <NonprofitCard
          nonprofitCardData={cardData}
          onClick={() => {
            window.location.replace(config.pages.nonprofit(cardData._id));
          }}
        />
      )}
    />
  );
};

export default LandingCarousel;
