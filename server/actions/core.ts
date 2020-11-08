import {
  NonprofitCardData as NonprofitCardDataType,
  PaginatedNonprofitCards
} from "../../utils/types";
import Mongo from "../index";
import Nonprofit from "../models/nonprofit";

const CARD_FIELDS: Record<keyof NonprofitCardDataType, 1> = {
  _id: 1,
  name: 1,
  headline: 1,
  about: 1,
  background: 1,
  logo: 1
};

export async function getNonprofitsCardData(): Promise<
  PaginatedNonprofitCards
> {
  await Mongo();

  const result = await Nonprofit.find({}, CARD_FIELDS).sort({ date: 1 });

  const cards = result.map(r => r.toJSON()) as NonprofitCardDataType[];

  return {
    cards: cards,
    page: 0,
    totalCount: cards.length,
    isLastPage: true
  };
}
