import React, { useState } from "react";

import { getNonprofitEvents } from "requests/events";
import { DatePaginatedEventCards } from "utils/types";

import EventsPageEventList from "../EventsPageEventList";

interface Props {
  date: string;
  nonprofitId: string;
}

const EventsPageOtherEventsList: React.FC<Props> = ({ date, nonprofitId }) => {
  const [otherEvents] = useState<DatePaginatedEventCards>({
    page: -1,
    isLastPage: false,
    cards: [],
    date
  });

  return (
    <EventsPageEventList
      paginatedEventCardsData={otherEvents}
      getMoreEvents={(page: number) =>
        getNonprofitEvents({
          page,
          nonprofitId,
          date
        })
      }
    />
  );
};

export default EventsPageOtherEventsList;
