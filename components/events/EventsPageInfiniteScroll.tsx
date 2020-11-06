import React, { useState, useRef, useEffect } from "react";

import { makeStyles, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroller";

import CoreTypography from "@core/typography";
import config from "config";
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
  sort: string;
  position: Position | undefined;
  getMoreEvents: (newPage: number) => Promise<FilterPaginatedEventCards>;
  sortCards: (lat: number, long: number) => Promise<FilterPaginatedEventCards>;
}

const EventsPageInfiniteScroll: React.FC<Props> = ({
  filteredEvents,
  sort,
  position,
  getMoreEvents,
  sortCards
}) => {
  const { endTextContainer } = useStyles();

  const [cards, setCards] = useState<EventCardData[]>(filteredEvents.cards);
  const [hasMore, setHasMore] = useState(!filteredEvents.isLastPage);

  const router = useRouter();

  const pageRef = useRef(filteredEvents.page);

  useEffect(() => {
    setCards(filteredEvents.cards);
    setHasMore(!filteredEvents.isLastPage);
    pageRef.current = filteredEvents.page;
  }, [filteredEvents]);

  useEffect(() => {
    if (sort === "location" && position !== undefined) {
      void (async () => {
        const sortedEvents = await sortCards(
          position.coords.latitude,
          position.coords.longitude
        );
        setCards(sortedEvents.cards);
        setHasMore(!sortedEvents.isLastPage);
        pageRef.current = sortedEvents.page;
      })();
    } else {
      void (async () => {
        const sortedEvents = await sortCards(-999, -999);
        setCards(sortedEvents.cards);
        setHasMore(!sortedEvents.isLastPage);
        pageRef.current = sortedEvents.page;
      })();
    }
  }, [sort, sortCards, position]);

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
      loadMore={async () => {
        const paginatedEvents = await getMoreEvents(pageRef.current + 1);
        pageRef.current = paginatedEvents.page;
        if (paginatedEvents.isLastPage) {
          setHasMore(false);
        }
        setCards([...cards, ...paginatedEvents.cards]);
      }}
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
