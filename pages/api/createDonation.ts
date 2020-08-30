import { NextApiRequest, NextApiResponse } from "next";
import { createDonation } from "server/actions/donation";
import { handleRequestWithPayloadResponse } from "utils/util";

// @route   POST api/createDonation
// @desc    Logs a Donation in our DB; doesn't process the payment nor interacts with Stripe
// @access  Public
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handleRequestWithPayloadResponse(req, res, createDonation, [
    "name",
    "email",
    "amount",
    "nonprofitId"
  ]);
