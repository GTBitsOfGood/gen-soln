import { NextApiRequest } from "next";
import Stripe from "stripe";
import Mongo from "server/index";
import Donation from "server/models/donation";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";
import config from "config";
import { Donation as DonationType } from "utils/types";

/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
const stripe = new Stripe(config.stripeSecret!, {
  apiVersion: "2020-03-02"
});

export async function logDonation({
  name,
  email,
  amount,
  nonprofitId
}: DonationType): Promise<void> {
  await Mongo();

  const nonprofit = await Nonprofit.findOne({ _id: nonprofitId });

  if (!nonprofit) {
    throw new Error(errors.nonprofit.INVALID_ID);
  }

  const donation = await Donation.create({
    name,
    email,
    amount,
    nonprofitId
  });

  const updateQuery = await nonprofit.updateOne({
    $push: { donations: donation }
  });

  if (updateQuery.ok !== 1) {
    throw new Error(errors.nonprofit.DONATION_LOG_FAILURE);
  }
}

export async function createPaymentIntent({
  amount
}: NextApiRequest["body"]): Promise<Stripe.PaymentIntent["client_secret"]> {
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd"
  });

  return paymentIntent.client_secret;
}
