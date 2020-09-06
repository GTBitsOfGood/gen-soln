import { NextApiRequest, NextApiResponse } from "next";
import { getDefaultNonprofitId } from "server/actions/nonprofit";
import { handleRequestWithPayloadResponse } from "utils/util";

// @route   GET api/getDefaultNonprofitId
// @desc    Get the default Nonprofit's ID
// @access  Public
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handleRequestWithPayloadResponse(req, res, getDefaultNonprofitId);
