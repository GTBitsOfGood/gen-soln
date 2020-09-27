import { DatePickerProps } from "material-ui";
import Mongo from "server/index";
import Event from "server/models/event";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";
import {
  Event as EventType,
  EventCardData as EventCardDataType,
  PaginatedEventCards as PaginatedEventCardsDataType
} from "utils/types";

const cardFields: Record<keyof EventCardDataType, 1> = {
  name: 1,
  startDate: 1,
  endDate: 1,
  image: 1,
  address: 1,
  nonprofitID: 1,
  duration: 1
};
const cardsPerPage = 4;

interface pageInformation {
  date: string;
  page: number;
  totCount: number;
}

export async function getUpcomingEventsCardData({
  date = new Date().toJSON(),
  page = 0,
  totCount
}: pageInformation) {
  await Mongo();

  const result = await Event.find(
    {
      startDate: {
        $gte: new Date()
      }
    },
    cardFields
  )
    .populate("nonprofitId", "name", Nonprofit)
    .sort({ startDate: 1 })
    .limit(totCount)
    .skip(page > 0 ? (page - 1) * cardsPerPage : 0)
    .limit(cardsPerPage);

  return {
    eventCards: result.map(r => r.toJSON()) as EventCardDataType[],
    page: page,
    totCount: totCount,
    date: date,
    isLastPage: totCount - page * cardsPerPage < 0
  } as PaginatedEventCardsDataType;
}

export async function getUpcomingEventsCardDataCount(date: Date) {
  await Mongo();

  const result = await Event.countDocuments({
    startDate: {
      $gte: date,
      $lte: new Date(date.getMilliseconds() + 6.048e8)
    }
  });
  return result;
}

interface Coordinates {
  lat: number;
  long: number;
}

export async function getNearestEventsCardData({ lat, long }: Coordinates) {
  await Mongo();

  const result = await Event.find({}, cardFields)
    .populate("nonprofitId", "name", Nonprofit)
    .where("address.location")
    .near({
      center: [long, lat],
      spherical: true
    })
    .limit(5);

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
