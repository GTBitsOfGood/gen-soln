import Mongo from "server/index";
import Event from "server/models/event";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";
import {
  Event as EventType,
  EventCardData as EventCardDataType,
  PaginatedEventCards as PaginatedEventCardsInterface
} from "utils/types";

const CARD_FIELDS: Record<keyof EventCardDataType, 1> = {
  name: 1,
  startDate: 1,
  endDate: 1,
  image: 1,
  address: 1,
  nonprofitID: 1,
  duration: 1
};
const CARDS_PER_PAGE = 4;
const MILLISECONDS_IN_WEEK = 7 * 24 * 60 * 60 * 1000;

interface PageInformation {
  date: string;
  page: number;
  totalCount: number;
}

export async function getUpcomingEventsCardData({
  date,
  page,
  totalCount
}: PageInformation): Promise<PaginatedEventCardsInterface> {
  await Mongo();

  const result = await Event.find(
    {
      startDate: {
        $gte: new Date(date),
        $leq: new Date(new Date(date).getTime() + MILLISECONDS_IN_WEEK)
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

interface Coordinates {
  lat: number;
  long: number;
}

export async function getNearestEventsCardData({ lat, long }: Coordinates) {
  await Mongo();

  const result = await Event.find({}, CARD_FIELDS)
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
