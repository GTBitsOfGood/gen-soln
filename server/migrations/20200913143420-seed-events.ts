import { Db } from "mongodb";
import { MigrationFunction } from "migrate-mongo";

const events = [
  {
    _id: "36593008",
    name: "Fundraiser",
    nonprofitId: "46099993",
    startDate: new Date("October 4, 2020 02:00:00"),
    endDate: new Date("October 4, 2020 05:00:00"),
    about:
      "We are looking for people with experience to take the lead in planning and overseeing the fundraiser activities with a group of volunteers",
    address: {
      text: "Main St, Creedmoor, NC 27522",
      location: {
        type: "Point",
        coordinates: [36.106344, -78.688526]
      }
    },
    maxVolunteers: 5,
    volunteers: []
  },
  {
    _id: "52638750",
    name: "Blood Drive",
    nonprofitId: "64357724",
    startDate: new Date("September 21, 2020 12:00:00"),
    endDate: new Date("September 21, 2020 04:00:00"),
    about:
      "The blood donation process from the time you arrive until the time you leave takes about an hour. The donation itself is only about 8-10 minutes on average.",
    address: {
      text: "1955 Monroe Drive, Atlanta, GA 30324",
      location: {
        type: "Point",
        coordinates: [33.807761, -84.37406]
      }
    },
    maxVolunteers: 150,
    volunteers: []
  },
  {
    _id: "81409375",
    name: "Food Drive",
    nonprofitId: "92232372",
    startDate: new Date("November 18, 2020 10:15:00"),
    endDate: new Date("November 18, 2020 01:00:00"),
    about:
      "Volunteers are needed to distributing packaged food to clients in a drive-thru fashion at Mount Canaan Baptist Church",
    address: {
      text: "4801 Highway 58, Chattanooga, TN 37416",
      location: {
        type: "Point",
        coordinates: [35.09096, -85.18751]
      }
    },
    maxVolunteers: 10,
    volunteers: []
  }
];

export const up: MigrationFunction = async (db: Db) => {
  await db.collection("events").insertMany(events);

  for (const event of events) {
    await db
      .collection("nonprofits")
      .updateOne({ _id: event.nonprofitId }, { $push: { events: event._id } });
  }
};

export const down: MigrationFunction = async (db: Db) => {
  await db
    .collection("events")
    .deleteMany({ _id: { $in: events.map(_ => _._id) } });

  for (const event of events) {
    await db
      .collection("nonprofits")
      .updateOne({ _id: event.nonprofitId }, { $pull: { events: event._id } });
  }
};
