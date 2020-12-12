import { NextApiRequest, NextApiResponse } from "next";

import { getNonprofitEventsCardData } from "server/actions/events";
import { handleGetRequestWithPayloadResponse } from "utils/util";

// @route   GET event card data
// @desc    Gets upcoming events given a nonprofit
// @access  Public
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> =>
  handleGetRequestWithPayloadResponse(
    req,
    res,
    getNonprofitEventsCardData,
    ["date", "nonprofitId", "page"],
    queryRecord => {
      const date = queryRecord.date;
      const nonprofitId = queryRecord.nonprofitId;
      const page = Number(queryRecord.page);

      if (Array.isArray(date) || Array.isArray(nonprofitId) || isNaN(page)) {
        throw new Error(
          "API call to getNonprofitEvents did not receive data of the expected type!"
        );
      }

      return {
        date,
        nonprofitId,
        page
      };
    }
  );
