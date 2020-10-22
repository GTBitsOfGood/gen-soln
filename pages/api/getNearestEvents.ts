import { NextApiRequest, NextApiResponse } from "next";

import { getNearestEventsCardData } from "server/actions/events";
import { handleGetRequestWithPayloadResponse } from "utils/util";

// @route   GET nearest events
// @desc    Gets nearest events
// @access  Public
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handleGetRequestWithPayloadResponse(
    req,
    res,
    getNearestEventsCardData,
    ["lat", "long", "page"],
    queryRecord => {
      const lat = Number(queryRecord.lat);
      const long = Number(queryRecord.long);
      const page = Number(queryRecord.page);

      if (isNaN(lat) || isNaN(long) || isNaN(page)) {
        throw new Error(
          "API call to getNearestEvents did not receive data of the expected type!"
        );
      }

      return {
        lat,
        long,
        page
      };
    }
  );
