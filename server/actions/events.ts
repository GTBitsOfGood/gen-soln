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
    .limit(5)
    .exec();

  return result as Promise<EventType[]>;
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
