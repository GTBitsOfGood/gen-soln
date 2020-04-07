import Mongo from "server/index";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";
import { Nonprofit as NonprofitType } from "utils/types";

export async function createNonprofit({
  name,
  headline,
  about,
  background,
  logo,
  primaryColor,
  secondaryColor
}: NonprofitType) {
  await Mongo();

  if (await Nonprofit.findOne({ name })) {
    throw new Error(errors.nonprofit.ALREADY_EXISTS);
  }

  return Nonprofit.create({
    name,
    headline,
    about,
    background,
    logo,
    primaryColor,
    secondaryColor
  });
}

export async function getNonprofitNames() {
  await Mongo();

  return Nonprofit.find({}, { name: 1 })
    .lean()
    .sort({ name: 1 }) as Array<
    Pick<NonprofitType, "name"> & Pick<NonprofitType, "_id">
  >;
}

export async function getNonprofitIds() {
  await Mongo();

  return Nonprofit.distinct("_id") as string[];
}

export async function getNonprofitById(_id: string) {
  await Mongo();

  // Exclude donation information for now:
  return Nonprofit.findOne({ _id }, { donations: 0 }).lean() as NonprofitType;
}

export async function getDefaultNonprofitId() {
  await Mongo();

  const result = (await Nonprofit.find({}, { _id: 1 })
    .lean()
    .sort({ name: 1 })
    .limit(1)) as Array<Pick<NonprofitType, "_id">>;

  return result[0]._id;
}
