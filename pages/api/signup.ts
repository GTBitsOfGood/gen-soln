// NOTE: This endpoint is somewhat of a security threat
// at the moment, as anyone can make a POST request and
// claim to be an admin for some particular organization.
import { NextApiRequest, NextApiResponse } from "next";
import { signup } from "server/actions/admin";
import { handleRequestWithPayloadResponse } from "utils/util";

// @route   POST api/signup
// @desc    Requests Admin Creation
// @access  Public
export default async (req: NextApiRequest, res: NextApiResponse) =>
  await handleRequestWithPayloadResponse(req, res, signup, [
    "firstName",
    "lastName",
    "email",
    "password",
    "nonprofitId"
  ]);
