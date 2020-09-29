import { Db } from "mongodb";
import { MigrationFunction } from "migrate-mongo";
import faker from "faker";
import { DEFAULT_IMAGE } from "server/models/event";

// Don't use 0 as seed, there is a bug in faker code
faker.seed(1);
faker.locale = "en_US";
const NUM_EVENTS = 300;
const FISRT_FAKE_ID = faker.random.number();
const NONPROFIT_IDS = ["46099993", "64357724", "92232372"];
const PARTIAL_EVENT_NAMES = ["Fundraiser", "Blood Drive", "Food Drive"];
const MILLISECONDS_IN_AN_HOUR = 60 * 60 * 1000;
// [lat, long]
const MAJOR_US_CITIES = [
  { city: "Atlanta", state: "GA", coordinates: [33.749, -84.388] },
  { city: "Chicago", state: "IL", coordinates: [41.8781, -87.6298] },
  { city: "New York", state: "NY", coordinates: [40.7128, -74.006] },
  { city: "Los Angeles", state: "CA", coordinates: [34.0522, -118.2437] },
  { city: "Houston", state: "TX", coordinates: [29.7604, -95.3698] },
  { city: "Phoenix", state: "AZ", coordinates: [33.4484, -112.074] },
  { city: "Miami", state: "FL", coordinates: [25.7617, -80.1918] },
  { city: "Seattle", state: "WA", coordinates: [47.6062, -122.3321] }
];

const events = Array(NUM_EVENTS)
  .fill(undefined)
  .map((_, index) => {
    const _id = (FISRT_FAKE_ID + index).toString();
    const name = `${faker.company.catchPhraseAdjective()} ${faker.random.arrayElement(
      PARTIAL_EVENT_NAMES
    )}`;
    const nonprofitId = faker.random.arrayElement(NONPROFIT_IDS);

    const startDate = faker.date.future();
    startDate.setMinutes(faker.random.arrayElement([0, 30])); // event begins at top of the hour or at 30 minutes into an hour

    const endDate = new Date(
      startDate.getTime() +
        faker.random.number({ min: 0.5, max: 6, precision: 0.5 }) * // durations range from 30 minutes to 6 hours
          MILLISECONDS_IN_AN_HOUR
    );

    const about = faker.lorem.paragraph();

    const { city, state, coordinates } = faker.random.arrayElement(
      MAJOR_US_CITIES
    );
    const addressText = `${faker.address.streetAddress()}, ${city}, ${state} ${faker.address.zipCodeByState(
      state
    )}`;
    const addressCoordinates = faker.address
      .nearbyGPSCoordinate(
        // @ts-ignore Types are incorrect :/
        coordinates
      )
      // @ts-ignore Types are incorrect :/
      .reverse()
      .map(parseFloat);

    const maxVolunteers = faker.random.number({
      min: 10,
      max: 500,
      precision: 10
    });

    return {
      _id,
      name,
      nonprofitId,
      startDate,
      endDate,
      about,
      address: {
        text: addressText,
        location: {
          type: "Point",
          coordinates: addressCoordinates
        }
      },
      maxVolunteers,
      volunteers: [],
      image: DEFAULT_IMAGE
    };
  });

export const up: MigrationFunction = async (db: Db) => {
  await db.collection("events").insertMany(events);

  await Promise.all(
    events.map(({ nonprofitId, _id }) => {
      return db
        .collection("nonprofits")
        .updateOne({ _id: nonprofitId }, { $push: { events: _id } });
    })
  );
};

export const down: MigrationFunction = async (db: Db) => {
  await db
    .collection("events")
    .deleteMany({ _id: { $in: events.map(_ => _._id) } });

  await Promise.all(
    events.map(({ nonprofitId, _id }) => {
      return db
        .collection("nonprofits")
        .updateOne({ _id: nonprofitId }, { $pull: { events: _id } });
    })
  );
};
