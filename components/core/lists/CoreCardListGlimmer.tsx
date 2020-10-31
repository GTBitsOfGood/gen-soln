import React from "react";

import { CoreCardList } from "@core/lists";

interface Props {
  cardGlimmer: React.ReactNode;
  cardWidth: number;
}

const CoreCardListGlimmer: React.FC<Props> = ({ cardGlimmer, cardWidth }) => {
  return (
    <CoreCardList
      cardsData={[]}
      renderCard={() => null}
      cardWidth={cardWidth}
      emptySlotCard={cardGlimmer}
      shouldShowNextButton={false}
    />
  );
};

export default CoreCardListGlimmer;
