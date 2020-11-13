import { NextApiRequest, NextApiResponse } from "next";

import { getAllEventsCardData } from "server/actions/events";
import { handleGetRequestWithPayloadResponse } from "utils/util";

// @route   GET event card data
// @desc    Gets event data
// @access  Public
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handleGetRequestWithPayloadResponse(
    req,
    res,
    getAllEventsCardData,
    ["date", "page"],
    queryRecord => {
      const date = queryRecord.date;
      const page = Number(queryRecord.page);

      if (Array.isArray(date) || isNaN(page)) {
        throw new Error(
          "API call to getUpcomingEvents did not receive data of the expected type!"
        );
      }

      return {
        date,
        page
      };
    }
  );
