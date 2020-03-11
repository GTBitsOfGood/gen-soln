import Mongo from "server/index";
import Donation from "server/models/donation";
import Nonprofit from "server/models/nonprofit";

const responses = {
  INVALID_ORG: "The nonprofit does not currently exist in our database."
};

export async function createDonation(fname, lname, amount, org) {
  await Mongo();

  const nonprofit = await Nonprofit.findOne({ name: org });

  // if the passed-in nonprofit exists in the database, create a donation
  // tied to that organization. also, update the organization's 'donations'
  // array to include this newly-created donation.
  if (!nonprofit) Promise.reject(new Error(responses.INVALID_ORG));
  else
    Donation.create({
      firstName: fname,
      lastName: lname,
      amount: amount,
      org: nonprofit._id
    }).then(donation => {
      nonprofit.donations.push(donation);
      nonprofit.save();
    });
}
