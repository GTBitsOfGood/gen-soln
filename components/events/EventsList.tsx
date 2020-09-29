import React, {
  createRef,
  RefObject,
  useEffect,
  useState,
  useRef,
  useCallback
} from "react";

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
    overflowX: "visible"
  },
  item: {
    marginRight: 32
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
    name: `Feeding ${i} Pigeon${i !== 1 ? "s" : ""} in the Park`,
    nonprofitName: "Pigeon Feeders International",
    time: "Sunday Morning",
    imagePath: "defaultImages/defaultEvent.png"
  };
};

const getEvents = async (n: number): Promise<[EventDisplay[], boolean]> => {
  // mock a server response lol
  await new Promise(r => setTimeout(r, 1000));
  const out = [];
  for (let i = 0; i < n && dataIndex < maxData; i++) {
    console.log(dataIndex);
    out.push(mockData(dataIndex));
    dataIndex++;
  }
  return [out, dataIndex < maxData];
};

const EventsList: React.FC = () => {
  const classes = useStyles();

  const [events, setEvents] = useState<EventDisplay[]>([]);
  const [numEvents, setNumEvents] = useState(0);
  const [first, setFirst] = useState(0);
  const [resized, setResized] = useState(true);
  const [rowSize, setRowSize] = useState(4);
  const [elRefs, setElRefs] = useState<RefObject<HTMLDivElement>[]>([]);
  const [maxElem, setMaxElem] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [transitionDir, setTransitionDir] = useState<-1 | 0 | 1>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const fetchTimeoutRef = useRef<number>();
  const resizeTimeoutRef = useRef<number>();

  useEffect(() => {
    if (first + rowSize > numEvents) {
      clearTimeout(fetchTimeoutRef.current);

      fetchTimeoutRef.current = window.setTimeout(() => {
        void (async () => {
          console.log(
            `first: ${first}\nrowSize: ${rowSize}\nnumEvents: ${numEvents}`
          );
          setLoading(true);
          const fetchNum = first + rowSize - numEvents;
          const [newEvents, hasMore] = await getEvents(fetchNum);
          if (!hasMore) {
            setMaxElem(numEvents + newEvents.length);
          }
          setEvents(prevEvents => [...prevEvents, ...newEvents]);
          setNumEvents(n => n + fetchNum);
          setLoading(false);
          setTransitionDir(0);
        })();
      }, 100);
    }
  }, [numEvents, first, rowSize]);

  // useEffect(() => {
  //   console.log("changing elRefs");
  //   // add or remove refs
  //   setElRefs(elRefs =>
  //     Array(rowSize)
  //       .fill(0)
  //       .map((_, i) => elRefs[i] || createRef())
  //   );
  //   setResized(false);
  // }, [resized]);

  const handleResize = useCallback(() => {
    clearTimeout(resizeTimeoutRef.current);
    const w = containerRef.current?.offsetWidth;
    resizeTimeoutRef.current = window.setTimeout(() => {
      setResized(true);
      if (w != null) {
        setRowSize(Math.floor(w / 301));
      }
    }, 250);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  // useEffect(() => {
  //   console.log("changing rowSize");
  //   const firstWrap = elRefs.findIndex(
  //     (ref, i) => ref.current?.offsetLeft === 0 && i !== 0
  //   );
  //   if (firstWrap !== -1) {
  //     setRowSize(firstWrap);
  //   }
  // }, [elRefs]);

  const nextPage = () => {
    setFirst(first + rowSize);
    setTransitionDir(1);
  };

  const prevPage = () => {
    setFirst(Math.max(first - rowSize, 0));
    setTransitionDir(-1);
  };

  const display: (EventDisplay | null)[] = events.slice(first, first + rowSize);
  if (maxElem == -1 || first + rowSize < maxElem) {
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
        <div className={classes.item} key={i} ref={elRefs[i]}>
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
