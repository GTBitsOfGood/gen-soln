import React, { useEffect, useState } from "react";

import makeStyles from "@material-ui/core/styles/makeStyles";
import { IconButton } from "@material-ui/core";
import EventCardLarge from "./EventCardLarge";
import EventCardGlimmerLarge from "./EventCardGlimmerLarge";
import ChevronRightIcon from "@horizon/icons/ChevronRightIcon";
import ChevronLeftIcon from "@horizon/icons/ChevronLeftIcon";

const useStyles = makeStyles({
  button: {
    backgroundColor: "white",
    boxShadow: "inset 0 0 0 1px #F0F0F0",
    "&:hover": {
      backgroundColor: "#f5f5f5"
    }
  },
  nextButtonContainer: {
    marginLeft: -24,
    // boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.05)",
    borderRadius: "50%"
  },
  prevButtonContainer: {
    marginLeft: 8,
    marginRight: -56,
    borderRadius: "50%",
    position: "relative",
    zIndex: 1
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    marginLeft: -32
  },
  item: {
    marginLeft: 32
  }
});

interface EventDisplay {
  name: string;
  nonprofitName: string;
  time: string;
  imagePath: string;
}

const maxData = 14;
let dataIndex = 0;
const mockData = (i: number) => {
  return {
    name: `Feeding ${i + 1} Pigeon${i !== 0 ? "s" : ""} in the Park`,
    nonprofitName: "Pigeon Feeders International",
    time: "Sunday Morning",
    imagePath: "defaultImages/defaultEvent.png"
  };
};

const getEvents = async (): Promise<[EventDisplay[], boolean]> => {
  // mock a server response lol
  await new Promise(r => setTimeout(r, 1000));
  const out = [];
  for (let i = 0; i < 4 && dataIndex < maxData; i++) {
    out.push(mockData(dataIndex));
    dataIndex++;
  }
  return [out, dataIndex < maxData];
};

const EventsList: React.FC = () => {
  const classes = useStyles();

  const [events, setEvents] = useState<EventDisplay[]>([]);
  const [numEvents, setNumEvents] = useState(0);
  const [page, setPage] = useState(0);
  const [maxPage, setMaxPage] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ((page + 1) * 4 > numEvents) {
      void (async () => {
        setLoading(true);
        const [newEvents, hasMore] = await getEvents();
        if (!hasMore) {
          setMaxPage(page);
        }
        setEvents(prevEvents => [...prevEvents, ...newEvents]);
        setNumEvents(n => n + 4);
        setLoading(false);
      })();
    }
  }, [numEvents, page]);

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  const display: (EventDisplay | null)[] = events.slice(page * 4, page * 4 + 4);
  if (maxPage == null) {
    while (display.length < 4) {
      display.push(null);
    }
  }

  return (
    <div className={classes.container}>
      {page > 0 && (
        <div className={classes.prevButtonContainer}>
          <IconButton
            aria-label="previous events"
            className={classes.button}
            onClick={prevPage}
          >
            <ChevronLeftIcon color="#1A1A1A" />
          </IconButton>
        </div>
      )}
      {display.map((event, i) => (
        <div className={classes.item} key={i}>
          {event != null ? (
            <EventCardLarge
              headerText={event.name}
              bodyText={event.nonprofitName}
              metaText={event.time}
              imagePath={event.imagePath}
            />
          ) : (
            <EventCardGlimmerLarge />
          )}
        </div>
      ))}
      {(maxPage == null || page < maxPage) && !loading && (
        <div className={classes.nextButtonContainer}>
          <IconButton
            aria-label="next events"
            className={classes.button}
            onClick={nextPage}
          >
            <ChevronRightIcon color="#1A1A1A" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default EventsList;
