import React, { useState, useRef, useCallback } from "react";

import { CoreCardList } from "@core/lists";
import { PaginatedCards } from "utils/types";

interface Props<CardData> {
  paginatedCardsData: PaginatedCards<CardData>;
  fetchCards: (newPage: number) => Promise<PaginatedCards<CardData>>;
  renderCard: (c: CardData) => React.ReactNode;
  cardGlimmer: React.ReactNode;
  cardWidth: number;
}

const CoreCardPaginationList = <CardData,>({
  paginatedCardsData,
  fetchCards,
  renderCard,
  cardGlimmer,
  cardWidth
}: Props<CardData>) => {
  const [cards, setCards] = useState(paginatedCardsData.cards);

  const [hasReceivedLastPageData, setHasReceivedLastPageData] = useState(
    paginatedCardsData.isLastPage
  ); // if cards has achieved the maximum possible length
  const [loading, setLoading] = useState(false);

  const pageRef = useRef(paginatedCardsData.page);

  // Lock calls to fetchCards if one is currently in progress
  const fetchingRef = useRef(false);

  const fetchMoreCards = useCallback(async () => {
    if (!hasReceivedLastPageData && !fetchingRef.current) {
      fetchingRef.current = true;
      setLoading(true);

      const { cards: newCards, page: newPage, isLastPage } = await fetchCards(
        pageRef.current + 1
      );
      // update refs before states to avoid some edge case bugs
      fetchingRef.current = false;
      pageRef.current = newPage;
      // technically we shouldn't over-write hasSeenLastPage after it has become true, but this code will never be called if hasSeenLastPage is already true
      setHasReceivedLastPageData(isLastPage);
      setCards(prevCards => [...prevCards, ...newCards]);
      setLoading(false);
    }
  }, [fetchCards, hasReceivedLastPageData]);

  return (
    <CoreCardList
      cardsData={cards}
      renderCard={renderCard}
      cardWidth={cardWidth}
      // always show the next button until we have received all the data and we aren't fetching more; else let CoreCardList use its own logic.
      shouldShowNextButton={
        !hasReceivedLastPageData && !loading ? true : undefined
      }
      hasReachedEndOfListCallback={fetchMoreCards}
      // once we have received all data, CoreCardList shouldn't try to render something for empty card slots
      emptySlotCard={!hasReceivedLastPageData && cardGlimmer}
    />
  );
};

export default CoreCardPaginationList;
