import React, { useState, useRef } from "react";

import { makeStyles, Grid } from "@material-ui/core";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroller";

import CoreTypography from "@core/typography";
import config from "config";
import { PaginatedEventCards } from "utils/types";

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
  paginatedEventCardsData: PaginatedEventCards;
  getMoreEvents?: (newPage: number) => Promise<PaginatedEventCards>;
}

const EventsPageInfiniteScrollGlimmer: React.FC = () => {
  return (
    <Grid container direction="row" alignItems="center" spacing={3}>
      {Array.from({ length: Math.floor(CARDS_PER_PAGE / 2) }, (_, i) => (
        <Grid key={`glimmer_${i}`} item>
          <EventsPageEventCardGlimmer />
        </Grid>
      ))}
    </Grid>
  );
};

const EventsPageInfiniteScroll: React.FC<Props> = ({
  paginatedEventCardsData,
  getMoreEvents
}) => {
  const { endTextContainer } = useStyles();

  const [cards, setCards] = useState(paginatedEventCardsData.cards);
  const [hasMore, setHasMore] = useState(!paginatedEventCardsData.isLastPage);

  const router = useRouter();

  const pageRef = useRef(paginatedEventCardsData.page);

  return (
    <InfiniteScroll
      loadMore={async () => {
        if (getMoreEvents != null) {
          const paginatedEvents = await getMoreEvents(pageRef.current + 1);
          pageRef.current = paginatedEvents.page;
          if (paginatedEvents.isLastPage) {
            setHasMore(false);
          }
          setCards(prevCards => [...prevCards, ...paginatedEvents.cards]);
        }
      }}
      hasMore={hasMore}
      loader={<EventsPageInfiniteScrollGlimmer key="glimmer_container" />}
      threshold={380}
    >
      <Grid container direction="row" alignItems="center" spacing={3}>
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
