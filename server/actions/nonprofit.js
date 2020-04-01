import Mongo from "server/index";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";

export async function createNonprofit(name, about, logo, colors) {
  await Mongo();

  return Nonprofit.findOne({ name: name }).then(nonprofit => {
    // if the nonprofit doesn't yet exist in the database, create a
    // new document using the passed-in parameters.
    return nonprofit
      ? Promise.reject(new Error(errors.nonprofit.ALREADY_EXISTS))
      : Nonprofit.create({
          name: name,
          about: about,
          logo: logo,
          colors: colors
        });
  });
}

export async function getNonprofitNames() {
  await Mongo();

  // compile and return an array containing the names of every
  // nonprofit in the collection.
  return Nonprofit.find().then(nonprofits => nonprofits.map(org => org.name));
}
