import { NextApiRequest, NextApiResponse } from "next";
import { recoverPassword } from "server/actions/admin";
import { handleRequestWithPayloadResponse } from "utils/util";

// @route   POST api/recoverPassword
// @desc    Check password recovery email exists
// @access  Public
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handleRequestWithPayloadResponse(req, res, recoverPassword, ["email"]);
