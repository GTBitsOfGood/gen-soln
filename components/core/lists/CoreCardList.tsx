import React, { useEffect, useState } from "react";

import { IconButton } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { ChevronRightIcon, ChevronLeftIcon } from "@core/icons";

import { useContainerResizeCallback } from "./useContainerResizeCallback";

const MARGIN_BETWEEN_CARDS = 32;
const MARGIN_ADJUSTMENT = 24; // to make enough space for next and previous buttons
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
      marginLeft: -(MARGIN_BETWEEN_CARDS + MARGIN_ADJUSTMENT), // since the last card container has marginRight: MARGIN_BETWEEN_CARDS
      borderRadius: "50%"
    },
    prevButtonContainer: {
      marginLeft: -MARGIN_ADJUSTMENT,
      marginRight: -MARGIN_ADJUSTMENT,
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
      marginLeft: -MARGIN_ADJUSTMENT,
      paddingLeft: MARGIN_ADJUSTMENT
    },
    item: {
      marginRight: MARGIN_BETWEEN_CARDS
    }
  })
);

interface Props<CardData> {
  cardsData: CardData[];
  renderCard: (c: CardData) => React.ReactNode;
  cardWidth: number;
  hasReachedEndOfListCallback?: () => void;
  emptySlotCard?: React.ReactNode;
  // If provided, CoreCardList will use it to determine if the next button should be shown, instead of using its own logic
  shouldShowNextButton?: boolean;
}

const DEFAULT_ROW_SIZE = 3;

const CoreCardList = <CardData,>({
  cardsData,
  renderCard,
  cardWidth,
  hasReachedEndOfListCallback,
  emptySlotCard,
  shouldShowNextButton
}: Props<CardData>) => {
  const classes = useStyles();

  // Index of the first element displayed in the list
  const [first, setFirst] = useState(0);

  // Number of elements displayed
  const [rowSize, setRowSize] = useState(DEFAULT_ROW_SIZE);

  const containerRef = useContainerResizeCallback(
    newWidth =>
      void setRowSize(
        Math.max(
          1,
          Math.floor(
            (newWidth - MARGIN_ADJUSTMENT) / (cardWidth + MARGIN_BETWEEN_CARDS)
          )
        )
      )
  );

  useEffect(() => {
    if (first + rowSize > cardsData.length && hasReachedEndOfListCallback) {
      hasReachedEndOfListCallback();
    }
  }, [cardsData.length, first, hasReachedEndOfListCallback, rowSize]);

  // click handlers for buttons
  const nextPage = () => {
    setFirst(prevFirst => prevFirst + rowSize);
  };

  const prevPage = () => {
    setFirst(prevFirst => Math.max(prevFirst - rowSize, 0));
  };

  // holds all the elements currently displayed
  const display = cardsData.slice(first, first + rowSize).map(renderCard);
  if (emptySlotCard && display.length < rowSize) {
    // not enough data to display; check if user wants to render custom UI in the empty slots
    display.push(...Array(rowSize - display.length).fill(emptySlotCard));
  }

  const hasNext = shouldShowNextButton ?? first + rowSize < cardsData.length;

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
      {hasNext && (
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

export default CoreCardList;
