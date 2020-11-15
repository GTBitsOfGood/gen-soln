import React from "react";

import CardPaginationList from "@core/list/CoreCardPaginationListNonproftCarousel";
import config from "config";
import { NonprofitCardData, PaginatedNonprofitCards } from "utils/types";

import NonprofitCard from "../cards/NonprofitCard";
import NonprofitCardGlimmer from "./NonprofitCardGlimmer";

interface Props {
  nonprofitCards: PaginatedNonprofitCards;
}

const NonprofitLandingCarousel: React.FC<Props> = props => {
  return (
    <CardPaginationList
      paginatedCardsData={props.nonprofitCards}
      cardGlimmer={<NonprofitCardGlimmer />}
      cardWidth={555}
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

export default NonprofitLandingCarousel;
