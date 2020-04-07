import { NextApiRequest, NextApiResponse } from "next";
import { createDonation } from "server/actions/donation";
import { handleRequestWithPayloadResponse } from "utils/util";

// @route   POST api/createDonation
// @desc    Creates a Donation
// @access  Public
export default async (req: NextApiRequest, res: NextApiResponse) =>
  await handleRequestWithPayloadResponse(req, res, createDonation, [
    "firstName",
    "lastName",
    "amount",
    "nonprofitId"
  ]);
