import { Client } from "@googlemaps/google-maps-services-js";
import NodeCache from "node-cache";

import config from "config";
import Mongo from "server/index";
import Event from "server/models/event";
import Nonprofit from "server/models/nonprofit";
import { addDays, getBeginningOfDay, getWeekendOffset } from "utils/date";
import errors from "utils/errors";
import {
  Event as EventType,
  EventCardData as EventCardDataType,
  DatePaginatedEventCards,
  DatePageRequest,
  LocationPaginatedEventCards,
  LocationPageRequest,
  FilterPaginatedEventCards,
  FilterPageRequest,
  FilterPageQueryArgs
} from "utils/types";

const filterCache = new NodeCache();

const CARD_FIELDS: Record<keyof EventCardDataType, 1> = {
  name: 1,
  startDate: 1,
  endDate: 1,
  image: 1,
  address: 1,
  nonprofitId: 1,
  duration: 1,
  _id: 1
};
const MILLISECONDS_IN_WEEK = 7 * 24 * 60 * 60 * 1000;
const METERS_IN_A_MILE = 1609.34;
const NEAREST_EVENTS_RADIUS_IN_MILES = 20;

export async function getAllEventsCardData({
  date,
  page
}: DatePageRequest): Promise<DatePaginatedEventCards> {
  const CARDS_PER_PAGE = 4;
  await Mongo();

  const result = await Event.find(
    {
      startDate: {
        $gte: new Date(date)
      }
    },
    CARD_FIELDS
  )
    .sort({ startDate: 1 })
    .skip(page * CARDS_PER_PAGE)
    .limit(CARDS_PER_PAGE + 1);

  return {
    cards: result
      .slice(0, CARDS_PER_PAGE)
      .map(r => r.toJSON()) as EventCardDataType[],
    page,
    date,
    isLastPage: result.length < CARDS_PER_PAGE + 1
  };
}

export async function getUpcomingEventsCardData({
  date,
  page
}: DatePageRequest): Promise<DatePaginatedEventCards> {
  const CARDS_PER_PAGE = 4;
  await Mongo();

  const result = await Event.find(
    {
      startDate: {
        $gte: new Date(date),
        $lte: new Date(new Date(date).getTime() + MILLISECONDS_IN_WEEK)
      }
    },
    CARD_FIELDS
  )
    .sort({ startDate: 1 })
    .skip(page * CARDS_PER_PAGE)
    .limit(CARDS_PER_PAGE + 1); // get one more than required so that we can check if this is the last page

  return {
    cards: result
      .slice(0, CARDS_PER_PAGE)
      .map(r => r.toJSON()) as EventCardDataType[],
    page,
    date,
    isLastPage: result.length < CARDS_PER_PAGE + 1
  };
}

export async function getNearestEventsCardData({
  lat,
  long,
  date,
  page
}: LocationPageRequest): Promise<LocationPaginatedEventCards> {
  const CARDS_PER_PAGE = 4;
  await Mongo();

  const result = await Event.find(
    {
      "address.location": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [long, lat]
          },
          $maxDistance: METERS_IN_A_MILE * NEAREST_EVENTS_RADIUS_IN_MILES
        }
      },
      startDate: {
        $gte: new Date(date)
      }
    },
    CARD_FIELDS
  )
    .skip(page * CARDS_PER_PAGE)
    .limit(CARDS_PER_PAGE + 1); // get one more than required so that we can check if this is the last page

  return {
    cards: result
      .slice(0, CARDS_PER_PAGE)
      .map(r => r.toJSON()) as EventCardDataType[],
    page,
    lat,
    long,
    isLastPage: result.length < CARDS_PER_PAGE + 1
  };
}

export async function getFilteredEventsCardData({
  causes,
  cities,
  times,
  page,
  lat,
  long,
  date,
  sortValue
}: FilterPageRequest): Promise<FilterPaginatedEventCards> {
  const CARDS_PER_PAGE = 16;
  await Mongo();

  let findQuery = await createFilterQuery({ causes, cities, times, date });
  let sortQuery = {};

  switch (sortValue) {
    case "location":
      // We can't sort by distance because of $geoWithin, but we can add a $near component
      // to the query using the user's location ($near returns sorted results).
      // ENSURE that createFilterQuery doesn't use "address.location".
      findQuery = {
        ...findQuery,
        "address.location": {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [long, lat]
            }
          }
        }
      };
      break;
    case "participants":
      sortQuery = {
        ...sortQuery,
        volunteers: -1
      };
      break;
    default: {
      const _exhaustiveCheck: never = sortValue;
      return _exhaustiveCheck;
    }
  }

  const result = await Event.find(findQuery, CARD_FIELDS)
    .skip(page * CARDS_PER_PAGE)
    .sort(sortQuery)
    .limit(CARDS_PER_PAGE + 1); // get one more than required so that we can check if this is the last page

  return {
    cards: result
      .slice(0, CARDS_PER_PAGE)
      .map(r => r.toJSON()) as EventCardDataType[],
    page,
    date,
    lat,
    long,
    cities,
    causes,
    times,
    sortValue,
    isLastPage: result.length < CARDS_PER_PAGE + 1
  };
}

export async function getFilteredEventsCardDataCount({
  causes,
  cities,
  times,
  date
}: FilterPageQueryArgs) {
  await Mongo();
  const findQuery = await createFilterQuery({ causes, cities, times, date });
  return Event.countDocuments(findQuery);
}
const createFilterQuery = async ({
  causes,
  cities,
  times,
  date
}: FilterPageQueryArgs) => {
  await Mongo();
  let findQuery = {};
  const [nonprofitIdsWithCauses, eventIdsInCities] = await Promise.all([
    getNonprofitIdsWithCauses(causes),
    getEventIdsInCities(cities)
  ]);
  if (causes.length) {
    findQuery = {
      ...findQuery,
      nonprofitId: { $in: nonprofitIdsWithCauses.flat() }
    };
  }

  if (cities.length) {
    // Can't append $geoWithin to findQuery; we must execute seperate queries with $geoWithin to get event IDs
    // and add those IDs to findQuery. This is done so that sorting by distance, which also uses "address.location" can work.
    findQuery = {
      ...findQuery,
      _id: { $in: eventIdsInCities.flat() }
    };
  }

  if (times.length) {
    const dateObj = new Date(date);
    const beginningOfDay = getBeginningOfDay(dateObj);
    const weekendOffset = getWeekendOffset(beginningOfDay);

    const timeFilters = times.map(time => {
      let startTime, endTime;
      switch (time) {
        case "TODAY":
          startTime = beginningOfDay;
          endTime = addDays(startTime, 1);
          break;
        case "TOMORROW":
          startTime = addDays(beginningOfDay, 1);
          endTime = addDays(startTime, 1);
          break;
        case "WEEKEND":
          startTime = addDays(beginningOfDay, weekendOffset);
          endTime = addDays(startTime, 2);
          break;
        case "NWEEKEND":
          startTime = addDays(beginningOfDay, weekendOffset + 7);
          endTime = addDays(startTime, 2);
          break;
        case "WEEK":
          startTime = dateObj;
          endTime = addDays(startTime, 7);
          break;
        case "NWEEK":
          startTime = addDays(dateObj, 7);
          endTime = addDays(startTime, 7);
          break;
        default: {
          const _exhaustiveCheck: never = time;
          return _exhaustiveCheck;
        }
      }
      return {
        startDate: {
          $gte: startTime,
          $lt: endTime
        }
      };
    });
    findQuery = {
      ...findQuery,
      $or: timeFilters
    };
  }

  findQuery = {
    ...findQuery,
    startDate: {
      // Always exclude past events
      $gte: new Date(date)
    }
  };

  return findQuery;
};

export async function getEventById(_id: string): Promise<EventType> {
  await Mongo();

  const event = await Event.findById(_id);

  if (event == null) {
    throw new Error(errors.event.INVALID_ID);
  }

  return event.toJSON() as EventType;
}

export async function getAllEventIds(): Promise<string[]> {
  await Mongo();

  return Event.distinct("_id").exec();
}

function getNonprofitIdsWithCauses(causes: FilterPageQueryArgs["causes"]) {
  return Promise.all(
    causes.map(async cause => {
      const cachedIds = filterCache.get<string[]>(cause);
      if (cachedIds != null) {
        return cachedIds;
      } else {
        const nonprofitsWithCause: string[] = await Nonprofit.distinct("_id", {
          cause
        });
        filterCache.set(
          cause,
          nonprofitsWithCause,
          MILLISECONDS_IN_WEEK / 1000
        );
        return nonprofitsWithCause;
      }
    })
  );
}

function getEventIdsInCities(cities: FilterPageQueryArgs["cities"]) {
  const client = new Client({});

  return Promise.all(
    cities.map(async city => {
      const cachedIds = filterCache.get<string[]>(city);
      if (cachedIds != null) {
        return cachedIds;
      } else {
        const geocode = await client.geocode({
          params: {
            address: city, // space delineated street address of location
            components: "country:US",
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            key: config.googleMaps.serverKey!
          }
        });

        const viewport = geocode.data.results[0].geometry.viewport;

        const north = viewport.northeast.lng;
        const east = viewport.northeast.lat;
        const south = viewport.southwest.lng;
        const west = viewport.southwest.lat;

        const cityBounds = [
          [
            [north, east],
            [south, east],
            [south, west],
            [north, west],
            [north, east] // duplicate the first one in order to create a closed loop for mongo
          ]
        ];

        const eventsInCity: string[] = await Event.distinct("_id", {
          "address.location": {
            $geoWithin: {
              $geometry: {
                type: "Polygon",
                coordinates: cityBounds
              }
            }
          }
        });
        filterCache.set(city, eventsInCity, MILLISECONDS_IN_WEEK / 1000);
        return eventsInCity;
      }
    })
  );
}
