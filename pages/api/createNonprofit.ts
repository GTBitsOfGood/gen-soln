import { NextApiRequest, NextApiResponse } from "next";
import { createNonprofit } from "server/actions/nonprofit";
import { handleRequestsWithPayloadResponse } from "utils/util";

// @route   POST api/createNonprofit
// @desc    Creates an Organization
// @access  Public
export default async (req: NextApiRequest, res: NextApiResponse) =>
  await handleRequestsWithPayloadResponse(req, res, createNonprofit, [
    "name",
    "about",
    "logo",
    "colors"
  ]);
