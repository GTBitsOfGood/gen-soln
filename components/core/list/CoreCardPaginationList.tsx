import React, { useEffect, useState, useRef, useCallback } from "react";

import { IconButton } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { ChevronRightIcon, ChevronLeftIcon } from "@core/icons";
import { PaginatedCards } from "utils/types";

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    button: {
      backgroundColor: palette.background.paper,
      boxShadow: `inset 0 0 0 1px ${palette.object.lightOutline}`,
      "&:hover": {
        backgroundColor: palette.object.darkOutline
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
    container: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "row",
      alignItems: "center",
      position: "relative",
      overflowX: "visible",
      overflowY: "hidden",
      marginLeft: -24,
      paddingLeft: 24
    },
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
}

const DEFAULT_ROW_SIZE = 4;
const MARGIN_ADJUSTMENT = 24;

const CoreCardPaginationList = <CardData,>({
  paginatedCardsData,
  fetchCards,
  renderCard,
  cardGlimmer,
  cardWidth = 283
}: Props<CardData>) => {
  const classes = useStyles();

  const [cards, setCards] = useState(paginatedCardsData.cards);

  // Index of the first element displayed in the list
  const [first, setFirst] = useState(0);

  // Number of elements displayed
  const [rowSize, setRowSize] = useState(DEFAULT_ROW_SIZE);
  const [hasReceivedLastPageData, setHasReceivedLastPageData] = useState(
    paginatedCardsData.isLastPage
  ); // if cards has achieved the maximum possible length
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(paginatedCardsData.page);

  // Lock calls to fetchCards if one is currently in progress
  const fetchingRef = useRef(false);

  const resizeTimeoutRef = useRef<number>();

  useEffect(() => {
    if (
      !hasReceivedLastPageData &&
      first + rowSize > cards.length &&
      !fetchingRef.current &&
      fetchCards != null
    ) {
      void (async () => {
        fetchingRef.current = true;
        setLoading(true);

        const { cards: newCards, page: newPage, isLastPage } = await fetchCards(
          pageRef.current + 1
        );

        setHasReceivedLastPageData(isLastPage); // technically we shouldn't over-write hasSeenLastPage after it has become true, but this code will never be called if hasSeenLastPage is already true
        setCards(prevCards => [...prevCards, ...newCards]);
        setLoading(false);
        pageRef.current = newPage;
        fetchingRef.current = false;
      })();
    }
  }, [cards.length, first, rowSize, fetchCards, hasReceivedLastPageData]);

  const handleResize = useCallback(() => {
    // wrap the resize in a 100ms debounce to prevent excess polling
    clearTimeout(resizeTimeoutRef.current);
    const w = containerRef.current?.offsetWidth;
    resizeTimeoutRef.current = window.setTimeout(() => {
      if (w != null) {
        setRowSize(
          Math.max(1, Math.floor((w - MARGIN_ADJUSTMENT) / cardWidth))
        );
      }
    }, 100);
  }, [cardWidth]);

  // add an event listener and call the initial row size update
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

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
    <div className={classes.container} ref={containerRef}>
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
      {hasNext && !loading && (
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

export default CoreCardPaginationList;
