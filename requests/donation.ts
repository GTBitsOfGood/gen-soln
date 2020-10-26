import config from "config";
import { Donation } from "utils/types";
import { fetchRequestWithPayloadResponse } from "utils/util";

/**
 * Send request to server to create a Stripe PaymentIntent, and send an email notification
 * of the transaction receipt.
 *
 * @param {number} amount - Amount (in US cents) to be collected by the PaymentIntent
 * @param {string} email - Email address to send the transaction receipt to
 * @param {string} stripeAccount - stripe account we are sending payment to
 * @returns {Promise<string>} - client_secret of the PaymentIntent created
 */
export const createPaymentIntent = async (
  amount: number,
  email: string,
  stripeAccount: string
): Promise<string> =>
  fetchRequestWithPayloadResponse<string>(config.apis.createPaymentIntent, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ amount, email, stripeAccount })
  });

export const logDonation = async (
  dontaion: Omit<Donation, "timestamp">
): Promise<boolean> =>
  fetchRequestWithPayloadResponse<boolean>(config.apis.logDonation, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dontaion)
  });
