import Mongo from "server/index";
import Donation from "server/models/donation";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";

export async function createDonation({ firstName, lastName, amount, org }) {
  await Mongo();

  const nonprofit = await Nonprofit.findOne({ name: org });

  if (!nonprofit) {
    throw new Error(errors.donation.INVALID_ORG);
  }

  const donation = await Donation.create({
    firstName,
    lastName,
    amount,
    org: nonprofit._id
  });

  nonprofit.donations.push(donation);
  nonprofit.save();

  return true;
}
