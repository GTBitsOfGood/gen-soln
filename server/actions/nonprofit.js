import Mongo from "server/index";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";

export async function createNonprofit({ name, about, logo, colors }) {
  await Mongo();

  if (await Nonprofit.findOne({ name })) {
    throw new Error(errors.nonprofit.ALREADY_EXISTS);
  }

  return Nonprofit.create({
    name,
    about,
    logo,
    colors
  });
}

export async function getNonprofitNames() {
  await Mongo();

  // compile and return an array containing the names of every
  // nonprofit in the collection.
  return Nonprofit.find({}, { name: 1, _id: 0 });
}
