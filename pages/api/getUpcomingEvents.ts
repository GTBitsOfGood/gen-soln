import { NextApiRequest, NextApiResponse } from "next";
import { getUpcomingEventsCardData } from "server/actions/events";
import { handleRequestWithPayloadResponse } from "utils/util";

// @route   GET event card data
// @desc    Gets event data
// @access  Public
// even though isLastPage is not used by getUpcomingEventsCardData(),
// the request body should include it since getUpcomingEventsCardData() 's
// arguments are of type DatePageInformation
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handleRequestWithPayloadResponse(req, res, getUpcomingEventsCardData, [
    "date",
    "page",
    "totalCount",
    "isLastPage"
  ]);
