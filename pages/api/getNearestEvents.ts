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
    ["lat", "long", "page", "totalCount", "isLastPage"],
    queryRecord => {
      const lat = Number(queryRecord.lat);
      const long = Number(queryRecord.long);
      const page = Number(queryRecord.page);
      const totalCount = Number(queryRecord.totalCount);
      const isLastPage =
        queryRecord.isLastPage === "true"
          ? true
          : queryRecord.isLastPage === "false"
          ? false
          : null;

      if (
        isNaN(lat) ||
        isNaN(long) ||
        isNaN(page) ||
        typeof isLastPage !== "boolean"
      ) {
        throw new Error(
          "API call to getNearestEvents did not receive data of the expected type!"
        );
      }

      return {
        lat,
        long,
        page,
        totalCount,
        isLastPage
      };
    }
  );
