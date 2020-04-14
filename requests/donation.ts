import urls from "config";
import { fetchRequestWithPayloadResponse } from "utils/util";
import { Donation } from "utils/types";

export const createPaymentIntent = async (amount: number) =>
  fetchRequestWithPayloadResponse<string>(urls.apis.paymentIntents, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ amount })
  });

export const createDonation = async ({
  name,
  email,
  amount,
  nonprofitId
}: Omit<Donation, "timestamp">) =>
  fetchRequestWithPayloadResponse<boolean>(urls.apis.createDonation, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, amount, nonprofitId })
  });
