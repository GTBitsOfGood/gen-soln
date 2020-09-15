import Mongo from "server/index";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";
import { Nonprofit as NonprofitType } from "utils/types";
import { Query } from "mongoose";

type NonprofitNameWithId = Pick<NonprofitType, "name"> &
  Pick<NonprofitType, "_id">;

export async function createNonprofit({
  name,
  headline,
  about,
  background,
  logo,
  primaryColor,
  secondaryColor,
  stripeAccount
}: NonprofitType) {
  await Mongo();

  return Nonprofit.create({
    name,
    headline,
    about,
    background,
    logo,
    primaryColor,
    secondaryColor,
    stripeAccount
  });
}

export async function getNonprofitNamesWithIds(): Query<NonprofitNameWithId[]> {
  await Mongo();

  return Nonprofit.find({}, { name: 1 }).lean().sort({ name: 1 });
}

export async function getNonprofitIds(): Query<string[]> {
  await Mongo();

  return Nonprofit.distinct("_id");
}

export async function getNonprofitById(_id: string): Promise<NonprofitType> {
  await Mongo();

  // Exclude donation information for now:
  const nonprofit = await Nonprofit.findOne(
    { _id },
    { donations: 0, stripeAccount: 0 }
  ).lean();
  if (nonprofit == null) {
    throw new Error(errors.nonprofit.INVALID_ID);
  }

  if (Array.isArray(nonprofit)) {
    throw new Error(errors.GENERIC_TEXT);
  }

  // @ts-ignore: Temporary, until our Nonprofit Mongoose model is typed
  return nonprofit;
}

export async function getDefaultNonprofitId(): Promise<string> {
  await Mongo();

  const result = (await Nonprofit.find({}, { _id: 1 })
    .lean()
    .sort({ name: 1 })
    .limit(1)) as Array<Pick<NonprofitType, "_id">>;

  return result[0]._id;
}
