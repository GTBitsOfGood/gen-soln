import { Client } from "@googlemaps/google-maps-services-js";

import config from "config";
import Mongo from "server/index";
import Event from "server/models/event";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";
import { FilterValue } from "utils/filters";
import {
  Event as EventType,
  EventCardData as EventCardDataType,
  DatePaginatedEventCards,
  DatePageInformation,
  LocationPaginatedEventCards,
  LocationPageInformation
} from "utils/types";

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
const CARDS_PER_PAGE = 4;
const MILLISECONDS_IN_WEEK = 7 * 24 * 60 * 60 * 1000;
const NEAREST_EVENTS_RADIUS = 20 / 3959; // radius for nearest events in radians (20 miles / earth's radius)

export async function getUpcomingEventsCardData({
  date,
  page,
  totalCount
}: DatePageInformation): Promise<DatePaginatedEventCards> {
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
    .populate("nonprofitId", "name", Nonprofit)
    .sort({ startDate: 1 })
    .skip(page > 0 ? (page - 1) * CARDS_PER_PAGE : 0)
    .limit(CARDS_PER_PAGE);

  return {
    eventCards: result.map(r => r.toJSON()) as EventCardDataType[],
    page,
    totalCount,
    date,
    isLastPage: totalCount - (page + 1) * CARDS_PER_PAGE <= 0
  };
}

export async function getUpcomingEventsCardDataCount(date: Date) {
  await Mongo();

  return Event.countDocuments({
    startDate: {
      $gte: date,
      $lte: new Date(date.getTime() + MILLISECONDS_IN_WEEK)
    }
  });
}

export async function getNearestEventsCardData({
  lat,
  long,
  page,
  totalCount
}: LocationPageInformation): Promise<LocationPaginatedEventCards> {
  await Mongo();

  if (totalCount == -1) {
    totalCount = await getNearestEventsCardDataCount({ lat, long });
  }

  const result = await Event.find(
    {
      "address.location": {
        $geoWithin: {
          $centerSphere: [[long, lat], NEAREST_EVENTS_RADIUS]
        }
      }
    },
    CARD_FIELDS
  )
    .populate("nonprofitId", "name", Nonprofit)
    .skip(page > 0 ? (page - 1) * CARDS_PER_PAGE : 0)
    .limit(CARDS_PER_PAGE);

  return {
    eventCards: result.map(r => r.toJSON()) as EventCardDataType[],
    page,
    totalCount,
    lat,
    long,
    isLastPage: totalCount - (page + 1) * CARDS_PER_PAGE <= 0
  };
}

export async function getNearestEventsCardDataCount({
  lat,
  long
}: Pick<LocationPageInformation, "lat" | "long">) {
  await Mongo();

  return Event.countDocuments({
    "address.location": {
      $geoWithin: {
        $centerSphere: [[long, lat], NEAREST_EVENTS_RADIUS]
      }
    }
  });
}

export async function getByFilteredEventsCardData(
  causes: FilterValue<"cause">[],
  cities: string[],
  times: FilterValue<"time">[]
) {
  await Mongo();

  let findQuery = {};
  if (causes.length) {
    const idsWithCause = await Nonprofit.find(
      {
        cause: { $in: causes }
      },
      "nonprofitId"
    );

    findQuery = {
      ...findQuery,
      nonprofitId: { $in: idsWithCause.map(r => r["_id"]) }
    };
  }
  if (cities.length) {
    const bounds = await getCityPolygonCoordinates(cities);

    findQuery = {
      ...findQuery,
      "address.location": {
        $geoWithin: {
          $geometry: {
            type: "MultiPolygon",
            coordinates: bounds
          }
        }
      }
    };
  }

  if (times.length) {
    let timeFilters: any[] = [];
    for (const time of times) {
      let startTime = new Date();
      startTime.setHours(0);
      startTime.setMinutes(0);
      startTime.setSeconds(0);
      startTime.setMilliseconds(0);
      let endTime = null;
      switch (time) {
        case "TODAY": {
          endTime = new Date(startTime);
          endTime.setDate(startTime.getDate() + 1);
          break;
        }
        case "TOMORROW": {
          startTime.setDate(startTime.getDate() + 1);
          endTime = new Date(startTime);
          endTime.setDate(startTime.getDate() + 1);
          break;
        }
        case "WEEKEND": {
          const offset = 6 - startTime.getDay();
          startTime.setDate(startTime.getDate() + offset);
          endTime = new Date(startTime);
          endTime.setDate(startTime.getDate() + 2);
          break;
        }
        case "NWEEKEND": {
          const offset = 6 - startTime.getDay();
          startTime.setDate(startTime.getDate() + offset + 7);
          endTime = new Date(startTime);
          endTime.setDate(startTime.getDate() + 2);
          break;
        }
        case "NWEEK": {
          startTime = new Date();
          startTime.setDate(startTime.getDate() + 7);
          endTime = new Date(startTime);
          endTime.setDate(startTime.getDate() + 7);
          break;
        }
        case "WEEK": {
          startTime = new Date();
          endTime = new Date(startTime);
          endTime.setDate(startTime.getDate() + 7);
          break;
        }
      }
      const tempQuery = {
        startDate: {
          $gte: startTime,
          $lt: endTime
        }
      };
      timeFilters = [...timeFilters, tempQuery];
    }
    findQuery = {
      ...findQuery,
      $or: timeFilters
    };
  }
  const result = await Event.find(findQuery).limit(5);
  return result.map(r => r.toJSON()) as EventCardDataType[];
}

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

function getCityPolygonCoordinates(cities: string[]) {
  const client = new Client({});

  return Promise.all(
    cities.map(async city => {
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

      return [
        [
          [north, east],
          [south, east],
          [south, west],
          [north, west],
          [north, east] // duplicate the first one in order to create a closed loop for mongo
        ]
      ];
    })
  );
}
