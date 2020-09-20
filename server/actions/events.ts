import Mongo from "server/index";
import Event from "server/models/event";
import errors from "utils/errors";
import { Event as EventType } from "utils/types";

export async function getUpcomingEvents() {
  await Mongo();

  const result = Event.find({
    startDate: {
      $gte: new Date()
    }
  })
    .lean()
    .sort({ startDate: 1 })
    .limit(5)
    .exec();

  return result as Promise<EventType[]>;
}

interface Coordinates {
  lat: number;
  long: number;
}

export async function getNearestEvents({ lat, long }: Coordinates) {
  await Mongo();

  const result = Event.find({})
    .where("address.location")
    .near({
      center: [long, lat],
      spherical: true
    })
    .lean()
    .limit(5)
    .exec();

  return result as Promise<EventType[]>;
}

export async function getEventById(_id: string): Promise<EventType> {
  await Mongo();

  const event = (await Event.findById(_id).lean()) as EventType;

  if (event == null) {
    throw new Error(errors.event.INVALID_ID);
  }

  return event;
}

export async function getAllEventIds(): Promise<string[]> {
  await Mongo();

  const result = (await Event.find({}, { _id: 1 })).map(event => event._id);

  return result;
}
