import { NextApiRequest } from "next";
import Stripe from "stripe";
import Mongo from "server/index";
import Donation from "server/models/donation";
import Nonprofit from "server/models/nonprofit";
import errors from "utils/errors";
import config from "config";
import {
  Donation as DonationType,
  IDonationDocument,
  INonprofitDocument
} from "utils/types";

/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
const stripe = new Stripe(config.stripeSecret!, {
  apiVersion: "2020-03-02"
});

export async function createDonation({
  name,
  email,
  amount,
  nonprofitId
}: DonationType): Promise<boolean> {
  await Mongo();

  const nonprofit: INonprofitDocument | null = await Nonprofit.findOne({
    _id: nonprofitId
  });

  if (!nonprofit) {
    throw new Error(errors.donation.INVALID_ORG);
  }

  const donation: IDonationDocument = await Donation.create({
    name,
    email,
    amount,
    nonprofitId
  } as DonationType);

  nonprofit.donations.push(donation._id);
  void nonprofit.save();

  return true;
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
