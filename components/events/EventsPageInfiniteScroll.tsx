import React, { useState, useRef, useEffect } from "react";

import { makeStyles, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroller";

import CoreTypography from "@core/typography";
import config from "config";
import { getFilteredEvents } from "requests/events";
import { EventCardData, FilterPaginatedEventCards } from "utils/types";

import EventsPageEventCard from "./EventsPageEventCard";
import EventsPageEventCardGlimmer from "./EventsPageEventCardGlimmer";

const useStyles = makeStyles({
  endTextContainer: {
    display: "flex",
    justifyContent: "center",
    paddingTop: 60
  }
});

const CARDS_PER_PAGE = 12;

interface Props {
  filteredEvents: FilterPaginatedEventCards;
}

const EventsPageInfiniteScroll: React.FC<Props> = ({ filteredEvents }) => {
  const { endTextContainer } = useStyles();

  const {
    cards: initialCards,
    causes,
    cities,
    times,
    page,
    lat,
    long,
    totalCount,
    date,
    isLastPage
  } = filteredEvents;

  const [cards, setCards] = useState<EventCardData[]>(initialCards);
  const [hasMore, setHasMore] = useState(!isLastPage);

  const router = useRouter();

  const pageRef = useRef(page);

  useEffect(() => {
    setCards(filteredEvents.cards);
    setHasMore(!filteredEvents.isLastPage);
    pageRef.current = filteredEvents.page;
  }, [filteredEvents]);

  const getMoreCards = async () => {
    const paginatedEvents = await getFilteredEvents({
      causes,
      cities,
      times,
      page: pageRef.current + 1,
      lat,
      long,
      totalCount,
      date
    });

    pageRef.current = paginatedEvents.page;

    if (paginatedEvents.isLastPage) {
      setHasMore(false);
    }

    setCards([...cards, ...paginatedEvents.cards]);
  };

  const glimmers = (
    <Grid
      key="glimmer_container"
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={3}
    >
      {Array.from({ length: CARDS_PER_PAGE }, (_, i) => (
        <Grid key={`glimmer_${i}`} item>
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
                void router.push(
                  config.pages.event(),
                  config.pages.event(card._id)
                );
              }}
            />
          </Grid>
        ))}
      </Grid>
      {!hasMore && (
        <div className={endTextContainer}>
          <CoreTypography>End of filter results</CoreTypography>
        </div>
      )}
    </InfiniteScroll>
  );
};

export default EventsPageInfiniteScroll;
