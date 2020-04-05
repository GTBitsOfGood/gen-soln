import Mongo from "server/index";
import Donation from "server/models/donation";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";

export async function createDonation(fname, lname, amount, org) {
  await Mongo();

  const nonprofit = await Nonprofit.findOne({ name: org });

  // if the passed-in nonprofit exists in the database, create a donation
  // tied to that organization. also, update the organization's 'donations'
  // array to include this newly-created donation.
  if (!nonprofit) {
    return Promise.reject(new Error(errors.donation.INVALID_ORG));
  } else {
    return Donation.create({
      firstName: fname,
      lastName: lname,
      amount: amount,
      org: nonprofit._id
    }).then(donation => {
      nonprofit.donations.push(donation);
      nonprofit.save();
    });
  }
}
