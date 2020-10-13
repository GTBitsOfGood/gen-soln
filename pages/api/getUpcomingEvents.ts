import { NextApiRequest, NextApiResponse } from "next";

import { getUpcomingEventsCardData } from "server/actions/events";
import { handleGetRequestWithPayloadResponse } from "utils/util";

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
  handleGetRequestWithPayloadResponse(
    req,
    res,
    getUpcomingEventsCardData,
    ["date", "page", "totalCount", "isLastPage"],
    queryRecord => {
      const date = queryRecord.date;
      const page = Number(queryRecord.page);
      const totalCount = Number(queryRecord.totalCount);
      const isLastPage =
        queryRecord.isLastPage === "true"
          ? true
          : queryRecord.isLastPage === "false"
          ? false
          : null;

      if (
        Array.isArray(date) ||
        isNaN(page) ||
        isNaN(totalCount) ||
        typeof isLastPage !== "boolean"
      ) {
        throw new Error(
          "API call to getUpcomingEvents did not receive data of the expected type!"
        );
      }

      return {
        date,
        page,
        totalCount,
        isLastPage
      };
    }
  );
