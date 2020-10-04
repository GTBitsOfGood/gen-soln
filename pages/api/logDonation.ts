import { NextApiRequest, NextApiResponse } from "next";
import { logDonation } from "server/actions/donation";
import { handleRequestWithPayloadResponse } from "utils/util";

// @route   POST api/logDonation
// @desc    Logs a Donation in our DB; doesn't process the payment nor interacts with Stripe
// @access  Public
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handleRequestWithPayloadResponse(req, res, logDonation, [
    "name",
    "email",
    "amount",
    "nonprofitId"
  ]);
