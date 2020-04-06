import { NextApiRequest, NextApiResponse } from "next";
import { checkToken } from "server/actions/admin.js";
import { handleRequestsWithPayloadResponse } from "utils/util";

// @route   POST api/checkToken
// @desc    Verifies Admin Token
// @access  Public
export default async (req: NextApiRequest, res: NextApiResponse) =>
  await handleRequestsWithPayloadResponse(req, res, checkToken, ["token"]);
