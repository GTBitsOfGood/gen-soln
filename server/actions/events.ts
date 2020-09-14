import Mongo from "server/index";
import Event from "server/models/event";
import { Event as EventType } from "utils/types";

export async function getUpcomingEvents(): Promise<EventType[]> {
  await Mongo();

  const result = (await Event.find({
    startDate: {
      $gte: new Date()
    }
  })
    .lean()
    .sort({ startDate: 1 })
    .limit(5)) as EventType[];

  return result;
}

interface Coordinates {
  lat: number;
  long: number;
}

export async function getNearestEvents({
  lat,
  long
}: Coordinates): Promise<EventType[]> {
  await Mongo();

  const result = (await Event.find({})
    .where("address.location")
    .near({
      center: [long, lat],
      sptherical: true
    })
    .lean()
    .limit(5)) as EventType[];

  return result;
}
