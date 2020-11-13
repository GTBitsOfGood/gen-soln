import React, { useEffect, useState, useRef, useCallback } from "react";

import { IconButton } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { ChevronRightIcon, ChevronLeftIcon } from "@core/icons";
import { PaginatedCards } from "utils/types";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    button: {
      backgroundColor: palette.background.paper,
      color: palette.text.primary,
      boxShadow: `inset 0 0 0 1px ${palette.object.lightOutline}`,
      "&:hover": {
        backgroundColor: palette.background.default,
        color: palette.text.hint
      }
    },
    nextButtonContainer: {
      marginLeft: -56,
      borderRadius: "50%"
    },
    prevButtonContainer: {
      marginLeft: -24,
      marginRight: -24,
      borderRadius: "50%",
      position: "relative",
      zIndex: 1
    },
    container: (props: { row_size: number; card_width: number }) => ({
      display: "flex",
      width: 48 + (props.card_width + 32) * props.row_size,
      flexWrap: "wrap",
      flexDirection: "row",
      alignItems: "center",
      position: "relative",
      overflowX: "visible",
      overflowY: "hidden",
      marginLeft: 24,
      paddingLeft: 24
    }),
    item: {
      marginRight: 32
    }
  })
);

interface Props<CardData> {
  paginatedCardsData: PaginatedCards<CardData>;
  fetchCards?: (newPage: number) => Promise<PaginatedCards<CardData>>;
  renderCard: (c: CardData) => JSX.Element;
  cardGlimmer: JSX.Element;
  cardWidth?: number;
  shouldWait?: boolean;
  setHasNoResults?: (b: boolean) => void;
}

const DEFAULT_ROW_SIZE = 4;
const MARGIN_ADJUSTMENT = 48;

const CoreCardPaginationListNonprofitCarousel = <CardData,>({
  paginatedCardsData,
  fetchCards,
  renderCard,
  cardGlimmer,
  cardWidth = 283,
  shouldWait = false,
  setHasNoResults
}: Props<CardData>) => {
  const [cards, setCards] = useState(paginatedCardsData.cards);

  // Index of the first element displayed in the list
  const [first, setFirst] = useState(0);

  // Number of elements displayed
  const [rowSize, setRowSize] = useState(DEFAULT_ROW_SIZE);
  const [styleProps, setStyleProps] = useState({
    row_size: rowSize,
    card_width: cardWidth
  });

  const classes = useStyles(styleProps);

  const [hasReceivedLastPageData, setHasReceivedLastPageData] = useState(
    paginatedCardsData.isLastPage
  ); // if cards has achieved the maximum possible length
  const [loading, setLoading] = useState(false);

  const pageRef = useRef(paginatedCardsData.page);

  // Lock calls to fetchCards if one is currently in progress
  const fetchingRef = useRef(false);

  const resizeTimeoutRef = useRef<number>();

  useEffect(() => {
    if (
      !hasReceivedLastPageData &&
      first + rowSize > cards.length &&
      !fetchingRef.current &&
      fetchCards != null &&
      !shouldWait
    ) {
      void (async () => {
        fetchingRef.current = true;
        setLoading(true);
        const { cards: newCards, page: newPage, isLastPage } = await fetchCards(
          pageRef.current + 1
        );

        pageRef.current = newPage;
        setHasReceivedLastPageData(isLastPage); // technically we shouldn't over-write hasSeenLastPage after it has become true, but this code will never be called if hasSeenLastPage is already true
        setCards(prevCards => [...prevCards, ...newCards]);
        setLoading(false);
        fetchingRef.current = false;

        // allow parent component to unmount this list if necessary
        if (isLastPage && cards.length + newCards.length === 0) {
          setHasNoResults != null && setHasNoResults(true);
        }
      })();
    }
  }, [
    cards.length,
    first,
    rowSize,
    fetchCards,
    hasReceivedLastPageData,
    shouldWait,
    setHasNoResults
  ]);

  const handleResize = useCallback(() => {
    // wrap the resize in a 100ms debounce to prevent excess polling
    clearTimeout(resizeTimeoutRef.current);
    const w = typeof window !== "undefined" ? window.innerWidth : null;
    resizeTimeoutRef.current = window.setTimeout(() => {
      if (w != null) {
        setRowSize(
          Math.max(1, Math.floor((w - MARGIN_ADJUSTMENT) / cardWidth))
        );
        setStyleProps({
          row_size: Math.max(
            1,
            Math.floor((w - MARGIN_ADJUSTMENT) / cardWidth)
          ),
          card_width: cardWidth
        });
      }
    }, 100);
  }, [cardWidth]);

  // add an event listener and call the initial row size update
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // we can't call handleResize directly here, the component might get
    // unmounted immediately and we can't set state after unmount
    const w = typeof window !== "undefined" ? window.innerWidth : null;
    if (w != null) {
      setRowSize(Math.max(1, Math.floor((w - MARGIN_ADJUSTMENT) / cardWidth)));
      setStyleProps({
        row_size: Math.max(1, Math.floor((w - MARGIN_ADJUSTMENT) / cardWidth)),
        card_width: cardWidth
      });
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [cardWidth, handleResize]);

  // click handlers for buttons
  const nextPage = () => {
    setFirst(first + rowSize);
  };

  const prevPage = () => {
    setFirst(Math.max(first - rowSize, 0));
  };

  // holds all the elements currently displayed
  const display = cards.slice(first, first + rowSize).map(renderCard);
  const hasNext = !hasReceivedLastPageData || first + rowSize < cards.length;
  if (hasNext) {
    // pad the display items with null if necessary
    while (display.length < rowSize) {
      display.push(cardGlimmer);
    }
  }

  return (
    <div className={classes.container}>
      {first > 0 && (
        <div className={classes.prevButtonContainer}>
          <IconButton
            aria-label="previous cards"
            className={classes.button}
            onClick={prevPage}
          >
            <ChevronLeftIcon />
          </IconButton>
        </div>
      )}
      {display.map((card, i) => (
        <div className={classes.item} key={i}>
          {card}
        </div>
      ))}
      {hasNext && !loading && !shouldWait && (
        <div className={classes.nextButtonContainer}>
          <IconButton
            aria-label="next cards"
            className={classes.button}
            onClick={nextPage}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default CoreCardPaginationListNonprofitCarousel;
