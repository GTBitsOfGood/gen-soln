import React, { useState } from "react";

import { Grid } from "@material-ui/core";
import InfiniteScroll from "react-infinite-scroller";

import { EventCardData, PaginatedEventCards } from "utils/types";

import EventsPageEventCard from "./EventsPageEventCard";
import EventsPageEventCardGlimmer from "./EventsPageEventCardGlimmer";

const CARDS_PER_PAGE = 12;

const mockCardData: EventCardData = {
  name: "Test",
  startDate: "1603054033",
  endDate: "1603054033",
  duration: 0,
  image: "/defaultImages/defaultEvent.png",
  address: {
    text: { main: "main location", secondary: "secondary location" },
    location: { type: "Point", coordinates: [1, 2] }
  },
  _id: "abc123",
  nonprofitId: "1234"
};

let pageId = 0;
const totalMockCards = 50;

const fetchCards = async (): Promise<PaginatedEventCards> => {
  console.log("fetching cards");
  await new Promise(r => setTimeout(r, 300));

  pageId++;

  return {
    page: pageId,
    totalCount: totalMockCards,
    isLastPage: totalMockCards - pageId * CARDS_PER_PAGE <= 0,
    cards: Array(CARDS_PER_PAGE).fill(mockCardData) as EventCardData[]
  };
};

const EventsPageInfiniteScroll: React.FC = () => {
  const [cards, setCards] = useState<EventCardData[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const getMoreCards = (): void => {
    void fetchCards().then(paginatedCards => {
      console.log(paginatedCards);
      if (paginatedCards.isLastPage) {
        setHasMore(false);
      }
      setCards([...cards, ...paginatedCards.cards]);
    });
  };

  const glimmers = (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      {Array.from({ length: CARDS_PER_PAGE }, (_, i) => (
        <Grid key={`glimmer${i}`} item>
          <EventsPageEventCardGlimmer />
        </Grid>
      ))}
    </Grid>
  );

  return (
    <InfiniteScroll
      loadMore={getMoreCards}
      hasMore={hasMore}
      loader={glimmers}
      threshold={750}
    >
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
      >
        {cards.map((card, i) => (
          <Grid key={i} item>
            <EventsPageEventCard
              eventCardData={card}
              onClick={() => {
                console.log(card._id);
              }}
            />
          </Grid>
        ))}
      </Grid>
    </InfiniteScroll>
  );
};

export default EventsPageInfiniteScroll;
