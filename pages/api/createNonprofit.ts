import { NextApiRequest, NextApiResponse } from "next";
import { createNonprofit } from "server/actions/nonprofit";
import { handleRequestWithPayloadResponse } from "utils/util";

// @route   POST api/createNonprofit
// @desc    Creates an Organization
// @access  Public
export default async (req: NextApiRequest, res: NextApiResponse) =>
  await handleRequestWithPayloadResponse(req, res, createNonprofit, [
    "name",
    "headline",
    "about",
    "background",
    "logo",
    "primaryColor",
    "secondaryColor"
  ]);
