import { NextApiRequest, NextApiResponse } from "next";

import { createPaymentIntent } from "server/actions/donation";
import { handlePostRequestWithPayloadResponse } from "utils/util";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handlePostRequestWithPayloadResponse(req, res, createPaymentIntent, [
    "amount",
    "email",
    "stripeAccount"
  ]);
