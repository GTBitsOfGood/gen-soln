import { NextApiRequest, NextApiResponse } from "next";
import { createPaymentIntent } from "server/actions/donation";
import { handleRequestWithPayloadResponse } from "utils/util";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handleRequestWithPayloadResponse(req, res, createPaymentIntent, [
    "amount",
    "email",
    "stripeAccount"
  ]);
