import { NextApiRequest } from "next";
import Stripe from "stripe";

import Mongo, { stripeConstructor } from "server/index";
import Donation from "server/models/donation";
import Nonprofit from "server/models/nonprofit";
import User from "server/models/user";
import errors from "utils/errors";
import { LoggedDonation } from "utils/types";

export async function logDonation({
  name,
  email,
  amount,
  userId,
  nonprofitId
}: LoggedDonation): Promise<void> {
  await Mongo();

  const [nonprofit, user] = await Promise.all([
    Nonprofit.findOne({ _id: nonprofitId }),
    User.findOne({ _id: userId }) // TODO: Don't allow front end to pass null resulting userId
  ]);

  if (!nonprofit) {
    throw new Error(errors.nonprofit.INVALID_ID);
  }

  if (!user /*TODO: Remove second condition*/ && user != "") {
    throw new Error(errors.user.INVALID_ID);
  }

  const donation = await Donation.create({
    name,
    email,
    amount,
    user,
    nonprofitId
  });

  const updateQuery = await nonprofit.updateOne({
    $push: { donations: donation }
  });

  if (updateQuery.ok !== 1) {
    throw new Error(errors.nonprofit.DONATION_LOG_FAILURE);
  }
}

/**
 * Server action to create a Stripe PaymentIntent, and send an email notification
 * of the transaction receipt.
 *
 * @param {number} amount - Amount (in US cents) to be collected by the PaymentIntent
 * @param {string} email - Email address to send the transaction receipt to
 * @param {string} stripeAccount - stripe account we are sending payment to
 * @returns {Promise<string>} - client_secret of the PaymentIntent created
 */
export async function createPaymentIntent({
  amount,
  email,
  stripeAccount
}: NextApiRequest["body"]): Promise<Stripe.PaymentIntent["client_secret"]> {
  const stripe = stripeConstructor();

  const paymentIntent = await stripe.paymentIntents.create(
    {
      amount,
      receipt_email: email,
      currency: "usd"
    },
    { stripeAccount: stripeAccount }
  );

  return paymentIntent.client_secret;
}
