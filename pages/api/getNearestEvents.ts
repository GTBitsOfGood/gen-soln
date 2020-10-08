import { NextApiRequest, NextApiResponse } from "next";
import { getNearestEventsCardData } from "server/actions/events";
import { handleRequestWithPayloadResponse } from "utils/util";

// @route   GET nearest events
// @desc    Gets nearest events
// @access  Public
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handleRequestWithPayloadResponse(req, res, getNearestEventsCardData, [
    "location",
    "page",
    "totalCount",
    "isLastPage"
  ]);
