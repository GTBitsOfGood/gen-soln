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

  if (await Nonprofit.exists({ name })) {
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
  } as NonprofitType);
}

export async function getNonprofitNames(): Promise<
  Array<Pick<NonprofitType, "name"> & Pick<NonprofitType, "_id">>
> {
  await Mongo();

  return Nonprofit.find({}, { name: 1 }).lean().sort({ name: 1 });
}

export async function getNonprofitIds(): Promise<string[]> {
  await Mongo();

  return await Nonprofit.distinct("_id");
}

export async function getNonprofitById(
  _id: string
): Promise<NonprofitType | null> {
  await Mongo();

  // Exclude donation information for now:
  return Nonprofit.findOne({ _id }, { donations: 0 }).lean();
}

export async function getDefaultNonprofitId(): Promise<string> {
  await Mongo();

  const result: Pick<NonprofitType, "_id">[] = (await Nonprofit.find(
    {},
    { _id: 1 }
  )
    .lean()
    .sort({ name: 1 })
    .limit(1)) as Array<Pick<NonprofitType, "_id">>;

  return result[0]._id;
}
