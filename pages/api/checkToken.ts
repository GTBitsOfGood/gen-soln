import { NextApiRequest, NextApiResponse } from "next";
import { checkToken } from "server/actions/admin";
import { handleRequestWithPayloadResponse } from "utils/util";

// @route   POST api/checkToken
// @desc    Verifies Admin Token
// @access  Public
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handleRequestWithPayloadResponse(req, res, checkToken, ["token"]);
