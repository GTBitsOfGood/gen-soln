import Mongo from "server/index";
import Event from "server/models/event";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";
import {
  Event as EventType,
  EventCardData as EventCardDataType
} from "utils/types";

const cardFields: Record<keyof EventCardDataType, 1> = {
  name: 1,
  startDate: 1,
  endDate: 1,
  image: 1,
  address: 1,
  nonprofitID: 1
};

export async function getUpcomingEventsCardData() {
  await Mongo();

  const result = Event.find(
    {
      startDate: {
        $gte: new Date()
      }
    },
    cardFields
  )
    .populate("nonprofitId", "name", Nonprofit)
    .lean()
    .sort({ startDate: 1 })
    .limit(5)
    .exec();

  return result as Promise<EventCardDataType[]>;
}

interface Coordinates {
  lat: number;
  long: number;
}

export async function getNearestEventsCardData({ lat, long }: Coordinates) {
  await Mongo();

  const result = Event.find({}, cardFields)
    .populate("nonprofitId", "name", Nonprofit)
    .where("address.location")
    .near({
      center: [long, lat],
      spherical: true
    })
    .lean()
    .limit(5)
    .exec();

  return result as Promise<EventCardDataType[]>;
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

  return Event.distinct("_id").exec();
}
