import { NextApiRequest, NextApiResponse } from "next";
import { login } from "server/actions/admin";
import { handleRequestsWithPayloadResponse } from "utils/util";

// @route   POST api/login
// @desc    Requests Admin Login
// @access  Public
export default async (req: NextApiRequest, res: NextApiResponse) =>
  await handleRequestsWithPayloadResponse(req, res, login, [
    "email",
    "password"
  ]);
