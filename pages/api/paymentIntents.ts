import { NextApiRequest, NextApiResponse } from "next";
import { createPaymentIntent } from "server/actions/donation";
import { handleRequestWithPayloadResponse } from "utils/util";

export default async (req: NextApiRequest, res: NextApiResponse) =>
  await handleRequestWithPayloadResponse(req, res, createPaymentIntent, [
    "amount"
  ]);
