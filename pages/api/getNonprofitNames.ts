import { NextApiRequest, NextApiResponse } from "next";
import { getNonprofitNames } from "server/actions/nonprofit";
import { handleRequestsWithPayloadResponse } from "utils/util";

// @route   GET api/getNonprofitNames
// @desc    Requests List of Nonprofits
// @access  Public
export default async (req: NextApiRequest, res: NextApiResponse) =>
  await handleRequestsWithPayloadResponse(req, res, getNonprofitNames);
