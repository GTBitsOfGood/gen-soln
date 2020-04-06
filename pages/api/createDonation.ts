import { NextApiRequest, NextApiResponse } from "next";
import { createDonation } from "server/actions/donation";
import { handleRequestsWithPayloadResponse } from "utils/util";

// @route   POST api/createDonation
// @desc    Creates a Donation
// @access  Public
export default async (req: NextApiRequest, res: NextApiResponse) =>
  await handleRequestsWithPayloadResponse(req, res, createDonation);
