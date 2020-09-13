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

export async function getNearestEvents(coordinate: {
  lat: number;
  long: number;
}): Promise<EventType[]> {
  await Mongo();

  const result = (await Event.find(
    {
      "address.location": {
        $nearSphere: {
          $geometry: {
            type: "Point",
            coordinates: [coordinate.lat, coordinate.long]
          }
        }
      }
    },
    {}
  )
    .lean()
    .limit(5)) as EventType[];

  return result;
}
