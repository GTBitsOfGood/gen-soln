import { NextApiRequest, NextApiResponse } from "next";
import { getUpcomingEventsCardData } from "server/actions/events";
import { handleRequestWithPayloadResponse } from "utils/util";

// @route   GET event card data
// @desc    Gets event data
// @access  Public
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handleRequestWithPayloadResponse(req, res, getUpcomingEventsCardData, [
    "date",
    "page",
    "totalCount"
  ]);
