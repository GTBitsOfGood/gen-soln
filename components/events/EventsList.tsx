import React, { useEffect, useState, useRef, useCallback } from "react";

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
    marginLeft: -56,
    // boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.05)",
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
    height: 270,
    overflowX: "visible",
    overflowY: "hidden",
    marginLeft: -24,
    paddingLeft: 24
  },
  item: {
    marginRight: 32
  }
});

interface EventDisplayInfo {
  name: string;
  nonprofitName: string;
  time: string;
  imagePath: string;
}

/** BEGIN MOCK SETUP */
const maxData = 14;
let dataIndex = 0;
const mockData = (i: number) => {
  return {
    name: `Feeding ${i} Pigeon${i !== 1 ? "s" : ""} in the Park`,
    nonprofitName: "Pigeon Feeders International",
    time: "Sunday Morning",
    imagePath: "defaultImages/defaultEvent.png"
  };
};

/**
 * Mocks a server request
 * @param n the number of events to return
 * @return a promise that contains [an array of EventDisplayInfo, true if there are remaining events]
 */
const getEvents = async (n: number): Promise<[EventDisplayInfo[], boolean]> => {
  await new Promise(r => setTimeout(r, 1000));
  const out = [];
  for (let i = 0; i < n && dataIndex < maxData; i++) {
    out.push(mockData(dataIndex));
    dataIndex++;
  }
  return [out, dataIndex < maxData];
};
/** END MOCK SETUP */

const DEFAULT_ROW_SIZE = 4;

const EventsList: React.FC = () => {
  const classes = useStyles();

  const [events, setEvents] = useState<EventDisplayInfo[]>([]);
  // Index of the first element displayed in the list
  const [first, setFirst] = useState(0);
  // Number of elements displayed
  const [rowSize, setRowSize] = useState(DEFAULT_ROW_SIZE);
  const [maxElem, setMaxElem] = useState(-1);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  // Lock calls to getEvents if one is currently in progress
  const fetchingRef = useRef(false);

  const resizeTimeoutRef = useRef<number>();

  useEffect(() => {
    if (first + rowSize > events.length && !fetchingRef.current) {
      void (async () => {
        fetchingRef.current = true;
        setLoading(true);
        const fetchNum = first + rowSize - events.length;
        const [newEvents, hasMore] = await getEvents(fetchNum);
        if (!hasMore) {
          setMaxElem(events.length + newEvents.length);
        }
        setEvents(prevEvents => [...prevEvents, ...newEvents]);
        setLoading(false);
        fetchingRef.current = false;
      })();
    }
  }, [events.length, first, rowSize]);

  const handleResize = useCallback(() => {
    // wrap the resize in a 100ms debounce to prevent excess polling
    clearTimeout(resizeTimeoutRef.current);
    const w = containerRef.current?.offsetWidth;
    const MARGIN_ADJUSTMENT = 24;
    const CARD_WIDTH = 283;
    resizeTimeoutRef.current = window.setTimeout(() => {
      if (w != null) {
        setRowSize(
          Math.max(1, Math.floor((w - MARGIN_ADJUSTMENT) / CARD_WIDTH))
        );
      }
    }, 100);
  }, []);

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

  // holds all the elements currently displayed - EventDisplayInfo gets rendered as
  // EventCardLarge, while null gets rendered as EventCardGlimmerLarge
  const display: (EventDisplayInfo | null)[] = events.slice(
    first,
    first + rowSize
  );
  if (maxElem === -1 || first + rowSize < maxElem) {
    // pad the display items with null if necessary
    while (display.length < rowSize) {
      display.push(null);
    }
  }

  return (
    <div className={classes.container} ref={containerRef}>
      {first > 0 && (
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
      {(maxElem == -1 || first + rowSize < maxElem) && !loading && (
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
