import { NextApiRequest, NextApiResponse } from "next";

import { recoverPassword } from "server/actions/admin";
import { handlePostRequestWithPayloadResponse } from "utils/util";

// @route   POST api/recoverPassword
// @desc    Check password recovery email exists
// @access  Public
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handlePostRequestWithPayloadResponse(req, res, recoverPassword, ["email"]);
