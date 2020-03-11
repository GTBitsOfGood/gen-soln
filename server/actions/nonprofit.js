import Mongo from "server/index";
import Nonprofit from "server/models/nonprofit";

const responses = {
  ALREADY_EXISTS: "There already exists a nonprofit by this name."
};

export async function createNonprofit(name, about, logo, colors) {
  await Mongo();

  return Nonprofit.findOne({ name: name }).then(nonprofit => {
    // if the nonprofit doesn't yet exist in the database, create a
    // new document using the passed-in parameters.
    return nonprofit
      ? Promise.reject(new Error(responses.ALREADY_EXISTS))
      : Nonprofit.create({
          name: name,
          about: about,
          logo: logo,
          colors: colors
        });
  });
}
