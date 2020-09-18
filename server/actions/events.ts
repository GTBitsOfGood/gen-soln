import Mongo from "server/index";
import Event from "server/models/event";
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
